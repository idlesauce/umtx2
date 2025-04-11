// @ts-check

const CUSTOM_ACTION_APPCACHE_REMOVE = "appcache-remove";

/**
 * @typedef {Object} PayloadInfo
 * @property {string} displayTitle
 * @property {string} description
 * @property {string} fileName - path relative to the payloads folder
 * @property {string} author
 * @property {string} projectSource
 * @property {string} binarySource - should be direct download link to the included version, so that you can verify the hashes
 * @property {string} version
 * @property {string[]?} [supportedFirmwares] - optional, these are interpreted as prefixes, so "" would match all, and "4." would match 4.xx, if not set, the payload is assumed to be compatible with all firmwares
 * @property {number?} [toPort] - optional, if the payload should be sent to "127.0.0.1:<port>" instead of loading directly, if specified it'll show up in webkit-only mode too
 * @property {string?} [customAction]
 */

/**
 * @type {PayloadInfo[]}
*/
const payload_map = [
    // { // auto-loaded
    //     displayTitle: "PS5 Payload ELF Loader",
    //     description: "Uses port 9021. Persistent network elf loader",
    //     fileName: "elfldr.elf",
    //     author: "john-tornblom",
    //     projectSource: "https://github.com/ps5-payload-dev/elfldr",
    //     binarySource: "https://github.com/ps5-payload-dev/elfldr/releases/download/v0.19/Payload.zip",
    //     version: "0.19",
    //     supportedFirmwares: ["1.", "2.", "3.", "4.", "5."]
    // },
    {
        displayTitle: "etaHEN",
        description: "AIO HEN",
        fileName: "etaHEN-2.0b.bin",
        author: "LightningMods, Buzzer, sleirsgoevy, ChendoChap, astrelsky, illusion, CTN, SiSTR0, Nomadic",
        projectSource: "https://github.com/etaHEN/etaHEN",
        binarySource: "https://github.com/etaHEN/etaHEN/blob/360e7c0d2dddf4f4645599d51d652e707c0b717b/etaHEN-2.0b.bin",
        version: "2.0b",
        toPort: 9021
    },
    {
        displayTitle: "ps5-kstuff",
        description: "FPKG enabler",
        fileName: "kstuff.elf",
        author: "sleirsgoevy, john-tornblom, EchoStretch, buzzer-re, BestPig, LightningMods, zecoxao",
        projectSource: "https://github.com/EchoStretch/kstuff",
        binarySource: "https://github.com/EchoStretch/kstuff/releases/download/v1.3/kstuff.elf",
        version: "1.3",
        supportedFirmwares: ["3.", "4.", "5."],
        toPort: 9021
    },
    {
        displayTitle: "Byepervisor HEN",
        description: "FPKG enabler",
        fileName: "byepervisor.elf",
        author: "SpecterDev, ChendoChap, flatz, fail0verflow, Znullptr, kiwidog, sleirsgoevy, EchoStretch, LightningMods, BestPig, zecoxao", 
        projectSource: "https://github.com/EchoStretch/Byepervisor",
        binarySource: "https://github.com/EchoStretch/Byepervisor/actions/runs/14004003762",
        version: "84164bb",
        supportedFirmwares: ["1.00", "1.01", "1.02", "1.12", "1.14", "2.00", "2.20", "2.25", "2.26", "2.30", "2.50", "2.70"],
        toPort: 9021
    },
    {
        displayTitle: "libhijacker game-patch",
        description: "Patches supported games to run at higher framerates, and adds debug menus to certain titles.",
        fileName: "libhijacker-game-patch.v1.160.elf",
        author: "illusion0001, astrelsky",
        projectSource: "https://github.com/illusion0001/libhijacker",
        binarySource: "https://github.com/illusion0001/libhijacker-game-patch/releases/tag/1.160-75ab26a3",
        version: "1.160",
        supportedFirmwares: ["3.", "4."]
    },
    {
        displayTitle: "websrv",
        description: "Custom homebrew loader. Runs on port 8080.",
        fileName: "websrv.elf",
        author: "john-tornblom",
        projectSource: "https://github.com/ps5-payload-dev/websrv",
        binarySource: "https://github.com/ps5-payload-dev/websrv/actions/runs/14318408868",
        version: "0.22",
        toPort: 9021
    },
    {
        displayTitle: "ftpsrv",
        description: "FTP server. Runs on port 2121.",
        fileName: "ftpsrv.elf",
        author: "john-tornblom",
        projectSource: "https://github.com/ps5-payload-dev/ftpsrv",
        binarySource: "https://github.com/ps5-payload-dev/pacbrew-repo/actions/runs/14012252230",
        version: "0.11.3",
        toPort: 9021
    },
    {
        displayTitle: "klogsrv",
        description: "Klog server. Runs on port 3232.",
        fileName: "klogsrv.elf",
        author: "john-tornblom",
        projectSource: "https://github.com/ps5-payload-dev/klogsrv",
        binarySource: "https://github.com/ps5-payload-dev/pacbrew-repo/actions/runs/14012252230",
        version: "0.5.3",
        toPort: 9021
    },
    {
        displayTitle: "shsrv",
        description: "Telnet shell server. Runs on port 2323.",
        fileName: "shsrv.elf",
        author: "john-tornblom",
        projectSource: "https://github.com/ps5-payload-dev/shsrv",
        binarySource: "https://github.com/ps5-payload-dev/shsrv/releases/tag/v0.15",
        version: "0.15",
        toPort: 9021
    },
    {
        displayTitle: "gdbsrv",
        description: "GDB server. Runs on port 2159.",
        fileName: "gdbsrv.elf",
        author: "john-tornblom",
        projectSource: "https://github.com/ps5-payload-dev/gdbsrv",
        binarySource: "https://github.com/ps5-payload-dev/pacbrew-repo/actions/runs/14012252230",
        version: "0.5",
        toPort: 9021
    },
    {
        displayTitle: "ps5debug",
        description: "Debugger (Experimental beta)",
        fileName: "ps5debug_v1.0b3.elf",
        author: "SiSTR0, ctn123",
        projectSource: "https://github.com/GoldHEN/ps5debug",
        binarySource: "https://github.com/GoldHEN/ps5debug/releases/download/1.0b3/ps5debug_v1.0b3.elf",
        version: "1.0b3",
        supportedFirmwares: ["3.", "4.", "5."],
        toPort: 9021
    },
    {
        displayTitle: "ps5debug",
        description: "Debugger, open source version by DizzRL",
        fileName: "ps5debug_dizz.elf",
        author: "Dizz, astrelsky, John Tornblom, SiSTR0, golden, idlesauce",
        projectSource: "https://github.com/idlesauce/ps5debug",
        binarySource: "https://github.com/idlesauce/ps5debug/releases/download/v0.0.1/ps5debug.elf",
        version: "0.0.1-r2",
        toPort: 9021
    },
    {
        displayTitle: "ps5-versions",
        description: "Shows kernel build, os and sdk versions",
        fileName: "ps5-versions.elf",
        author: "SiSTRo",
        projectSource: "https://github.com/SiSTR0/ps5-versions",
        binarySource: "https://github.com/SiSTR0/ps5-versions/releases/download/v1.0/ps5-versions.elf",
        version: "1.0",
        supportedFirmwares: ["1.", "2.", "3.", "4."]
    },
    {
        displayTitle: "ps5-remoteplay-get-pin",
        description: "Get Remote Play PIN for offline activated users. Send again to cancel.",
        fileName: "rp-get-pin.elf",
        author: "idlesauce",
        projectSource: "https://github.com/idlesauce/ps5-remoteplay-get-pin",
        binarySource: "https://github.com/idlesauce/ps5-remoteplay-get-pin/releases/tag/v0.1.1",
        version: "0.1.1",
        toPort: 9021
    },
    {
        // https://github.com/Storm21CH/PS5_Browser_appCache_remove
        displayTitle: "Browser appcache remover",
        description: "Deletes for only the current user in webkit-only mode",
        fileName: "",
        author: "Storm21CH, idlesauce",
        projectSource: "",
        binarySource: "",
        version: "1.0",
        customAction: CUSTOM_ACTION_APPCACHE_REMOVE
    }

];
