import axios from "axios";
import { bungie } from "./ApiBungie";

class manifest {
    constructor() {
        this.tables = {};
        this.definitions = [
            "DestinyClassDefinition",
            "DestinyRecordDefinition",
            "DestinyInventoryItemDefinition",
        ];
    }

    async fetchManifest() {
        try {
            const response = await bungie.get("/Platform/Destiny2/Manifest/");
            const url = response.data.Response.jsonWorldContentPaths.fr;

            for (const definition of this.definitions) {
                const manifestURL = "https://www.bungie.net" + url;
                const responseHash = await axios.get(manifestURL);
                this.tables[definition] = responseHash.data[definition];
            }
        } catch (error) {
            console.error("Erreur lors de la récupération du manifeste :", error);
        }
    }

    num(hash) {
        try {
            for (const definition of this.definitions) {
                const table = this.tables[definition];
                if (table && table[hash]) {
                    return table[hash];
                }
            }
            console.log("Aucune définition trouvée pour le hash :", hash);
            return hash;
        } catch (erreur) {
            console.log("Erreur :", erreur);
            return hash;
        }
    }
}
const manifestInstance = new manifest();
export default manifestInstance;