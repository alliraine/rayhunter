<script lang="ts">
    import {get_config } from "$lib/utils.svelte";
    import type { DeviceConfig } from "$lib/deviceConfig";
    import Card from "$lib/components/Card.svelte";

    let loaded = $state(false);
    let device_config: DeviceConfig | undefined = $state(undefined);
    $effect(() => {
        const interval = setInterval(async () => {
            device_config = await get_config();
            loaded = true;
        }, 1000);

        return () => clearInterval(interval);
    })


</script>

<div class="m-4 xl:mx-8 flex flex-col gap-4">
    {#if loaded}
        <Card>
            <div class="text-xl text-center">
                Settings
            </div>
            <form method="POST" class="flex flex-col gap-4">
                <label>
                    QMDL Store Path
                    <input class="p-2 border rounded-md" name="qmdl_store_path" type="text" value={device_config.qmdl_store_path}>
                </label>
                <label>
                    Port
                    <input class="p-2 border rounded-md" name="port" type="text" value={device_config.port}>
                </label>
                <label>
                    Enable Debug Mode
                    <input type="checkbox" class="" />
                </label>
                <label>
                    Enable Debug Mode
                    <input type="checkbox" class="" />                </label>
                <label>
                    Enable Dummy Analyzer
                    <input type="checkbox" class="" />                </label>
                <label>
                    Enable Colorblind Mode
                    <input type="checkbox" class="" />                </label>
                <label>
                    UI Settings
                    <input name="password" type="password">
                </label>
                <button class="hover:bg-rayhunter-dark-blue bg-rayhunter-blue text-white font-bold py-2 px-4 rounded-md flex flex-row">
                    Save
                 </button>
            </form>
        </Card>
    {:else}
        <div class="flex flex-col justify-center items-center">
            <img src="/rayhunter_orca_only.png" class="h-48 animate-spin"/>
            <p class="text-xl">Loading...</p>
        </div>
    {/if}
</div>
