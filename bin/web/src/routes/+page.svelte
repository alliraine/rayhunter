<script lang="ts">
    import { ManifestEntry } from "$lib/manifest.svelte";
    import { get_manifest, get_system_stats } from "$lib/utils.svelte";
    import ManifestTable from "$lib/components/ManifestTable.svelte";
    import type { SystemStats } from "$lib/systemStats";
    import { AnalysisManager } from "$lib/analysisManager.svelte";
	import SystemStatsTable from "$lib/components/SystemStatsTable.svelte";
	import DeleteAllButton from "$lib/components/DeleteAllButton.svelte";
    import RecordingControls from "$lib/components//RecordingControls.svelte";
    import ManifestCard from "$lib/components/ManifestCard.svelte";

    let manager: AnalysisManager = new AnalysisManager();
    let loaded = $state(false);
    let recording = $state(false);
    let entries: ManifestEntry[] = $state([]);
    let current_entry: ManifestEntry | undefined = $state(undefined);
    let system_stats: SystemStats | undefined = $state(undefined);
    $effect(() => {
        const interval = setInterval(async () => {
            await manager.update();
            let new_manifest = await get_manifest();
            await new_manifest.set_analysis_status(manager);
            entries = new_manifest.entries;
            current_entry = new_manifest.current_entry;
            recording = current_entry !== undefined;

            system_stats = await get_system_stats();
            loaded = true;
        }, 1000);

        return () => clearInterval(interval);
    })
</script>

<div class="m-4 xl:mx-8 flex flex-col gap-4">
{#if loaded}
    <div class="flex flex-col lg:flex-row gap-4">
        {#if recording}
            <ManifestCard entry={current_entry} current={true} i={0} server_is_recording={recording}/>
        {:else}
            <div class="bg-red-100 border-red-100 drop-shadow p-4 flex flex-col gap-2 border rounded-md flex-1 justify-between">
                <span class="text-2xl font-bold mb-2 flex flex-row items-center gap-2 text-red-600">
                    <svg class="w-8 h-8 text-red-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v5a1 1 0 1 0 2 0V8Zm-1 7a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H12Z" clip-rule="evenodd"/>
                    </svg>
                    WARNING: Not Running
                </span>
                <span>Rayhunter is not currently running and will not detect abnormal behavior!</span>
                <div class="flex flex-row justify-end mt-2">
                    <RecordingControls {recording} />
                </div>
            </div>
        {/if}
        <SystemStatsTable stats={system_stats!} />
    </div>
    <div class="flex flex-col gap-2">
        <span class="text-xl">History</span>
        <ManifestTable entries={entries} server_is_recording={recording} />
    </div>
    <DeleteAllButton/>
{:else}
    <div class="flex flex-col justify-center items-center">
        <img src="/rayhunter_orca_only.png" class="h-48 animate-spin"/>
        <p class="text-xl">Loading...</p>
    </div>
{/if}
</div>
