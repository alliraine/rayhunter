<script lang="ts">
    import { get_config } from "$lib/utils.svelte";
    import type { DeviceConfig } from "$lib/deviceConfig";
    import Card from "$lib/components/Card.svelte";
    import Toggle from "flowbite-svelte/Toggle.svelte";
    import Input from "flowbite-svelte/Input.svelte";
    import Button from "flowbite-svelte/Button.svelte";
    import Select from "flowbite-svelte/Select.svelte";

    const label_class = "flex flex-row gap-2 items-center justify-between";

    let loaded = $state(false);
    let device_config: DeviceConfig | undefined = $state(undefined);

    let orbic_ui_options = [
        { value: 0, name: "Invisible Mode" },
        { value: 1, name: "Status Line" },
        { value: 2, name: "Demo Mode" },
        { value: 3, name: "EFF Logo" },
    ];

    let tplink_ui_options = [
        { value: 0, name: "Invisible Mode" },
        { value: 1, name: "Status Emoji" },
        { value: 2, name: "Status Emoji" },
        { value: 3, name: "Status Emoji" },
    ];

    let key_input_options = [
        { value: 0, name: "Disabled" },
        { value: 1, name: "Double-Click to Restart Capture" },
    ];

    let advanced_visible = $state(false);
    function toggle_advanced_visible() {
        advanced_visible = !advanced_visible;
    }

    $effect(() => {
        (async () => {
            device_config = await get_config();
            loaded = true;
        })();
    });

</script>

<div class="m-4 xl:mx-8 flex flex-col gap-4">
    {#if loaded}
        <Card>
            <div class="text-xl text-center">
                Settings
            </div>
            <form method="POST" class="flex flex-col gap-4">
                <label class="flex flex-col gap-1">
                    Device Display Options
                    <Select items={orbic_ui_options} bind:value={device_config.ui_level} />
                </label>
                <label class="flex flex-col gap-1">
                    Device Key Input Mode
                    <Select items={key_input_options} bind:value={device_config.key_input_mode} />
                </label>
                <label class="{label_class}">
                    Enable Colorblind Mode
                    <Toggle color="purple" size="large" checked={device_config.colorblind_mode} />
                </label>
                <label class="{label_class}">
                    <span>Enable Debug Mode</span>
                    <Toggle color="purple" size="large" checked={device_config.debug_mode}/>
                </label>
                <div class="bg-gray-200 p-4 border rounded-md border-gray-200 inset-shadow">
                <a class="cursor-pointer flex flex-row gap-1" onclick={toggle_advanced_visible}>
                    <svg class="w-6 h-6 text-gray-800 transition-transform {advanced_visible ? 'rotate-180' : ''}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/>
                    </svg>
                    <span>Advanced Settings</span>
                </a>
                <div class="border-t-1 border-gray-300 flex flex-col gap-4 pt-3 mt-4 {advanced_visible ? '' : 'hidden'}">
                    <label class="{label_class}">
                        Enable Dummy Analyzer
                        <Toggle color="purple" size="large" checked={device_config.enable_dummy_analyzer} />
                    </label>
                    <label class="flex flex-col gap-1">
                        <span>QMDL Store Path</span>
                        <div>
                            <Input clearable value={device_config.qmdl_store_path} />
                        </div>
                        <div class="text-xs text-red-500 font-medium">
                            Warning: Changing this may break your installation
                        </div>
                    </label>
                    <label class="flex flex-col gap-1">
                        Port
                        <Input clearable value={device_config.port} />
                    </label>
                </div>
                </div>
                <div class="flex flex-row gap-2 justify-center">
                    <Button type="submit" class="bg-rayhunter-blue hover:bg-rayhunter-dark-blue cursor-pointer">Save & Restart</Button>
                    <Button type="submit" class="bg-rayhunter-blue hover:bg-rayhunter-dark-blue cursor-pointer">Save</Button>
                </div>
            </form>
        </Card>
    {:else}
        <div class="flex flex-col justify-center items-center">
            <img src="/rayhunter_orca_only.png" class="h-48 animate-spin"/>
            <p class="text-xl">Loading...</p>
        </div>
    {/if}
</div>
