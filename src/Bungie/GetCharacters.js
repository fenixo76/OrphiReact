import axios from "axios";
import config from "../Config.json"
import manifest from "./Manifest"
import { Components } from "./Components";

export const getCharter = async (membershipType, membershipId, Token) => {
    const P = document.querySelector(".loadingP");
    try {
        const response = await axios.get(`https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/?components=${Components.Characters}`, {
            timeout: 10000,
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${Token}`,
                "X-API-Key": config.API_KEY,
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });

        const charactersData = response.data.Response.characters.data;
        const characterIds = Object.keys(charactersData);

        if (characterIds.length === 0) {
            console.log("Aucun personnage disponible.");
            return;
        }
        await manifest.fetchManifest()

        characterIds.forEach(characterId => {
            const Character = charactersData[characterId];

            const CharterID = Character.characterId;
            const EmblemeImg = Character.emblemBackgroundPath
            const Stats = Character.stats
         
            const Class = manifest.num(Character.classHash).displayProperties.name

            let Titre = Character.titleRecordHash

            if(Titre === undefined){
                Titre = ""
            }else{
                Titre = manifest.num(Titre).displayProperties.name
            }

            const Personage = {
                class: Class,
                characterId: CharterID,
                Emblem: EmblemeImg,
                titre: Titre,
                lvl: Stats,
            }

            P.innerHTML = `Classe : ${Personage.class} </br> LVL: ${Personage.lvl[1935470627]}`

            SaveCharacter(Personage)

           
        });
    } catch (error) {
        console.log(`Impossible de récupérer les personnages : ${error}`);
    }
};

const SaveCharacter = (newInfo) => {
    const loading = document.querySelector(".loading-screen");
    const Tableau = JSON.parse(localStorage.getItem("SaveInfoUser")) || {};
    const key = newInfo.class;
    Tableau[key] = newInfo;
    localStorage.setItem("SaveInfoUser", JSON.stringify(Tableau));

    if (Tableau[key]) {
        setTimeout(() => {
            loading.style.display = "none";
        }, 3000);
    }
};

