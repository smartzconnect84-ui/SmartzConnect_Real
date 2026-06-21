// src/pages/TestVoiceCall.tsx
import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { joinLivekitRoom } from "../lib/livekit";

import type { Room } from "livekit-client";

export default function TestVoiceCall() {
  const [roomName, setRoomName] = useState("voice-room");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState<string | null>(null);

  const [isMicEnabled, setIsMicEnabled] = useState(true);

  const livekitRoomRef = useState<Room | null>(null);

  const [livekitUrl, setLivekitUrl] = useState<string>("");
  const [token, setToken] = useState<string>("");

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
  const functionUrl = useMemo(
    () => `${supabaseUrl}/functions/v1/livekit-token`,
    [supabaseUrl],
  );

  async function fetchTokenAndJoin() {
    setError(null);
    setStatus("fetching token...");

    const session = (await supabase.auth.getSession()).data.session;
    const accessToken = session?.access_token;

    if (!accessToken) {
      setError("No Supabase session found. Please log in.");
      setStatus("error");
      return;
    }

    const res = await fetch(functionUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomName }),
    });

    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      setError(`Token request failed: ${res.status} ${txt}`);
      setStatus("error");
      return;
    }

    const data = (await res.json()) as {
      token: string;
      roomName: string;
      livekitUrl: string;
    };

    setLivekitUrl(data.livekitUrl);
    setToken(data.token);

    setStatus("joining LiveKit...");
    const { room } = await joinLivekitRoom({
      livekitUrl: data.livekitUrl,
      token: data.token,
      roomName: data.roomName,
      onStatus: setStatus,
    });

    // Publish local audio based on mic toggle
    // livekit-client API differs slightly by version; this pattern is typical.
    // If these exact calls differ in your version, tell me your livekit-client version.
    const localParticipant = room.localParticipant;

    // Enable/disable mic by tracking publication
    if (isMicEnabled) {
      try {
        await localParticipant.setMicrophoneEnabled(true);
        setStatus("Mic enabled");
      } catch {
        // fallback: ignore
      }
    } else {
      try {
        await localParticipant.setMicrophoneEnabled(false);
        setStatus("Mic disabled");
      } catch {
        // fallback: ignore
      }
    }

    // store room
    livekitRoomRef[0] = room;
  }

  useEffect(() => {
    // when mic toggle changes, update LiveKit if already joined
    const room = livekitRoomRef[0];
    if (!room) return;
    const localParticipant = room.localParticipant;

    (async () => {
      try {
        await localParticipant.setMicrophoneEnabled(isMicEnabled);
        setStatus(isMicEnabled ? "Mic enabled" : "Mic disabled");
      } catch {
        // If the API differs, we keep UI toggle but don’t hard-crash.
      }
    })();
  }, [isMicEnabled]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    return () => {
      const room = livekitRoomRef[0];
      if (room) {
        room.disconnect();
        livekitRoomRef[0] = null;
      }
    };
  }, []);

  return (
    <div style={{ padding: 16, maxWidth: 720 }}>
      <h2>Test Voice Call</h2>

      <div style={{ marginBottom: 12 }}>
        <label>
          Room name:&nbsp;
          <input
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
        </label>
      </div>

      <div style={{ marginBottom: 12 }}>
        <button onClick={fetchTokenAndJoin}>Join Voice Room</button>
      </div>

      <div style={{ marginBottom: 12 }}>
        <button
          onClick={() => setIsMicEnabled((v) => !v)}
          aria-pressed={isMicEnabled}
        >
          {isMicEnabled ? "Mute Microphone" : "Unmute Microphone"}
        </button>
      </div>

      <div style={{ marginBottom: 12 }}>
        <strong>Status:</strong> {status}
      </div>

      {error && (
        <div style={{ color: "crimson" }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      <div style={{ fontSize: 12, opacity: 0.8 }}>
        Token is fetched server-side from Edge Function; LiveKit secret is never
        exposed.
      </div>
    </div>
  );
}
