import { Manifest } from "./manifest.svelte";
import type { SystemStats } from "./systemStats";
import type { DeviceConfig } from "./deviceConfig";

export async function req(method: string, url: string): Promise<string> {
    const response = await fetch(url, {
        method: method,
    });
    const body = await response.text();
    if (response.status >= 200 && response.status < 300) {
        return body;
    } else {
        throw new Error(body);
    }
}

export async function get_manifest(): Promise<Manifest> {
    const manifest_json = JSON.parse(await req('GET', '/api/qmdl-manifest'));
    return new Manifest(manifest_json);
}

export async function get_config(): Promise<DeviceConfig> {
    return JSON.parse(await req('GET', '/api/config'));
}

export async function get_system_stats(): Promise<SystemStats> {
    return JSON.parse(await req('GET', '/api/system-stats'));
}
