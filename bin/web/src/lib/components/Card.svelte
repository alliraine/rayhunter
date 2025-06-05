<script lang="ts">
    let { additional_classes = '' } = $props();
</script>

<div class="bg-gray-100 border-gray-100 drop-shadow p-4 flex flex-col gap-2 border rounded-md flex-1 {additional_classes}">
    <slot></slot>
</div>
