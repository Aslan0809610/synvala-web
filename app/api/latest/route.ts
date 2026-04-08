/**
 * Auto-update version check endpoint.
 * The Synvala app fetches this on startup to check for new versions.
 *
 * To release an update: change the version and downloadUrl below, then redeploy.
 */

import { NextResponse } from "next/server";

const LATEST = {
  version: "0.2.0",
  downloadUrl: "https://www.synvala.com/download",
  releaseNotes: "Initial public release with Free/Pro/Lab licensing.",
  date: "2026-04-08",
};

export async function GET() {
  return NextResponse.json(LATEST, {
    headers: {
      "Cache-Control": "public, max-age=3600", // Cache for 1 hour
      "Access-Control-Allow-Origin": "*",
    },
  });
}
