import { Channel } from "@/types/data";

export function getLocalChannels() {
  return JSON.parse(
    localStorage.getItem("jky-m-channels") ?? "[]"
  ) as Channel[];
}

export function setLocalChannels(channels: Channel[]) {
  return localStorage.setItem("jky-m-channels", JSON.stringify(channels));
}
