/**
 * Auto-update version check endpoint.
 * The Synvala app fetches this on startup to check for new versions.
 *
 * To release an update: change the version and downloadUrl below, then redeploy.
 */

import { NextResponse } from "next/server";

const LATEST = {
  version: "1.0.0",
  downloadUrl: "https://www.synvala.com/download",
  releaseNotes: "v1.0.0 — First stable release. Multistep yield fix, bilingual help manual.",
  date: "2026-04-09",
};

export async function GET() {
  return NextResponse.json(LATEST, {
    headers: {
      "Cache-Control": "public, max-age=3600", // Cache for 1 hour
      "Access-Control-Allow-Origin": "*",
    },
  });
}
