import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { text, voiceId, speed } = await request.json();

  const selectedVoiceId =
    typeof voiceId === "string" ? voiceId : "2Lb1en5ujrODDIqmp7F3";

  if (!text || typeof text !== "string") {
    return NextResponse.json({ error: "Texto inválido" }, { status: 400 });
  }

  const apiKey = process.env.ELEVENLABS_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "API key no configurada" },
      { status: 500 }
    );
  }

  try {
    const finalSpeed = typeof speed === "number" ? speed : 1.0;

    const requestBody = {
      text,
      model_id: "eleven_multilingual_v2",
      voice_settings: {
        stability: 0.75,
        similarity_boost: 0.75,
        style: 0.0,
        use_speaker_boost: true,
        speed: finalSpeed,
      },
    };

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${selectedVoiceId}`,
      {
        method: "POST",
        headers: {
          "xi-api-key": apiKey,
          "Content-Type": "application/json",
          Accept: "audio/mpeg",
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const err = await response.json();
      console.error("Error desde ElevenLabs:", err);
      return NextResponse.json(
        { error: "Error al generar audio" },
        { status: 500 }
      );
    }

    const audio = await response.arrayBuffer();

    return new NextResponse(audio, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
      },
    });
  } catch (error) {
    console.error("Error al llamar a ElevenLabs:", error);
    return NextResponse.json(
      { error: "Fallo en el servidor" },
      { status: 500 }
    );
  }
}
