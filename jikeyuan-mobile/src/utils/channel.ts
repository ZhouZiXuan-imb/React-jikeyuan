import { Channel, UserChannel, UserChannelResponse } from "@/types/data";
import { getChannelsList } from "@/api/homeApi";

export function getLocalChannels() {
  let channels = JSON.parse(
    localStorage.getItem("jky-m-channels") ?? "[]"
  ) as Channel[];
  console.log(channels);
  return channels;
}

export function setLocalChannels(channels: Channel[]) {
  return localStorage.setItem("jky-m-channels", JSON.stringify(channels));
}
