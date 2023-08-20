import axios from "axios";
import config from "../Config.json"
import manifest from "./Manifest"
import { Components } from "./Components";
import { FaAngleDown } from "react-icons/fa"
import React from "react";

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
            const EmblemPath = Character.emblemPath
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
                EmblemPath : EmblemPath, 
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
            const div = document.querySelector(".Personnage")

            const Personnage = document.createElement("div")
            Personnage.classList.add("Personnage_Emblem")

            const Contenaire = document.createElement("div")
            Contenaire.classList.add("Contenaire_Personnage")

            const Emblem = document.createElement("img")
            Emblem.classList.add("Emblem")
            Emblem.src = `https://www.bungie.net/${Tableau[key].Emblem}`

            const EmblemPath = document.createElement("img")
            EmblemPath.classList.add("EmblemPath")
            EmblemPath.src = `https://www.bungie.net/${Tableau[key].EmblemPath}`

            const Name = document.createElement("p")
            Name.classList.add("Name")
            Name.innerHTML = Tableau[key].class

            const Titre = document.createElement("p")
            Titre.classList.add("Titre")
            Titre.innerHTML = Tableau[key].titre

            const Puissance = document.createElement("h2")
            Puissance.classList.add("Puissance")
            Puissance.innerHTML = Tableau[key].lvl[1935470627]

            const Stats = document.createElement("div")
            Stats.classList.add("Stats")
            // Div Mobilité
            const Mobilite = document.createElement("div")
            Mobilite.classList.add("Mobilite")

                const ImgMobilite = document.createElement("img")
                ImgMobilite.classList.add("IM")
                ImgMobilite.src = Components.Mobilite

                const ContenaireBarreM = document.createElement("div")
                ContenaireBarreM.classList.add("ContenaireBarre")

                    const BarStatM = document.createElement("div")
                    BarStatM.classList.add("BarStat")
                    BarStatM.style.width = "100%"

                        const BarContM = document.createElement("p")
                        BarContM.innerHTML = "100"

                            const BarMobilite = document.createElement("div")
                            BarMobilite.classList.add("bar")
                            BarMobilite.style.width = `${Tableau[key].lvl[2996146975]}%`

                                const TextM = document.createElement('p')
                                TextM.innerHTML = `${Tableau[key].lvl[2996146975]}`
            //Div Resistance
            const Resistance = document.createElement("div")
            Resistance.classList.add("Resistance")

                const ImgResistance = document.createElement("img")
                ImgResistance.classList.add("IRES")
                ImgResistance.src = Components.Resistance

                const ContenaireBarreRES = document.createElement("div")
                ContenaireBarreRES.classList.add("ContenaireBarre")

                    const BarStatRES = document.createElement("div")
                    BarStatRES.classList.add("BarStat")
                    BarStatRES.style.width = "100%"

                        const BarContRES = document.createElement("p")
                        BarContRES.innerHTML = "100"

                            const BarResistance = document.createElement("div")
                            BarResistance.classList.add("bar")
                            BarResistance.style.width = `${Tableau[key].lvl[392767087]}%`

                                const TextRES = document.createElement('p')
                                TextRES.innerHTML = `${Tableau[key].lvl[392767087]}`
            //Div Recuperation
            const Recuperation = document.createElement("div")
            Recuperation.classList.add("Recuperation")

                const ImgRecuperation = document.createElement("img")
                ImgRecuperation.classList.add("IREC")
                ImgRecuperation.src = Components.Recuperation

                const ContenaireBarreREC = document.createElement("div")
                ContenaireBarreREC.classList.add("ContenaireBarre")

                    const BarStatREC = document.createElement("div")
                    BarStatREC.classList.add("BarStat")
                    BarStatREC.style.width = "100%"

                        const BarContREC = document.createElement("p")
                        BarContREC.innerHTML = "100"

                            const BarRecuperation = document.createElement("div")
                            BarRecuperation.classList.add("bar")
                            BarRecuperation.style.width = `${Tableau[key].lvl[1943323491]}%`

                                const TextREC = document.createElement('p')
                                TextREC.innerHTML = `${Tableau[key].lvl[1943323491]}`
            //Div Discipline
            const Discipline = document.createElement("div")
            Discipline.classList.add("Discipline")

                const ImgDiscipline = document.createElement("img")
                ImgDiscipline.classList.add("ID")
                ImgDiscipline.src = Components.Discipline

                const ContenaireBarreD = document.createElement("div")
                ContenaireBarreD.classList.add("ContenaireBarre")

                    const BarStatD = document.createElement("div")
                    BarStatD.classList.add("BarStat")
                    BarStatD.style.width = "100%"

                            const BarDiscipline = document.createElement("div")
                            BarDiscipline.classList.add("bar")

                                const BarContD = document.createElement("p")
                                BarContD.innerHTML = "100"
                                BarDiscipline.style.width = `${Tableau[key].lvl[1735777505]}%`

                                    const TextD = document.createElement('p')
                                    TextD.innerHTML = `${Tableau[key].lvl[1735777505]}`
            //Div Intelligence
            const Intelligence = document.createElement("div")
            Intelligence.classList.add("Intelligence")

                const ImgIntelligence = document.createElement("img")
                ImgIntelligence.classList.add("II")
                ImgIntelligence.src = Components.Intelligence

                const ContenaireBarreI = document.createElement("div")
                ContenaireBarreI.classList.add("ContenaireBarre")

                    const BarStatI = document.createElement("div")
                    BarStatI.classList.add("BarStat")
                    BarStatI.style.width = "100%"

                        const BarContI = document.createElement("p")
                        BarContI.innerHTML = "100"

                            const BarIntelligence = document.createElement("div")
                            BarIntelligence.classList.add("bar")
                            BarIntelligence.style.width = `${Tableau[key].lvl[144602215]}%`

                                const TextI = document.createElement('p')
                                TextI.innerHTML = `${Tableau[key].lvl[144602215]}`
            //Div Force
            const Force = document.createElement("div")
            Force.classList.add("Force")

                const ImgForce = document.createElement("img")
                ImgForce.classList.add("IF")
                ImgForce.src = Components.Force

                const ContenaireBarreF = document.createElement("div")
                ContenaireBarreF.classList.add("ContenaireBarre")

                    const BarStatF = document.createElement("div")
                    BarStatF.classList.add("BarStat")
                    BarStatF.style.width = "100%"

                        const BarContF = document.createElement("p")
                        BarContF.innerHTML = "100"

                            const BarForce = document.createElement("div")
                            BarForce.classList.add("bar")
                            BarForce.style.width = `${Tableau[key].lvl[4244567218]}%`
                                const TextF = document.createElement('p')
                                TextF.innerHTML = `${Tableau[key].lvl[144602215]}`


            div.appendChild(Personnage)

            Personnage.appendChild(Contenaire)

            Contenaire.appendChild(EmblemPath)
            Contenaire.appendChild(Emblem)
            Contenaire.appendChild(Name)
            Contenaire.appendChild(Titre)
            Contenaire.appendChild(Puissance)
            Contenaire.appendChild(Stats)

            Stats.appendChild(Mobilite)
            Stats.appendChild(Resistance)
            Stats.appendChild(Recuperation)
            Stats.appendChild(Discipline)
            Stats.appendChild(Intelligence)
            Stats.appendChild(Force)

            Mobilite.appendChild(ImgMobilite)
            Mobilite.appendChild(ContenaireBarreM)
            ContenaireBarreM.appendChild(BarStatM)
            ContenaireBarreM.appendChild(BarMobilite)
            BarStatM.appendChild(BarContM)
            BarMobilite.appendChild(TextM)

            Resistance.appendChild(ImgResistance)
            Resistance.appendChild(ContenaireBarreRES)
            ContenaireBarreRES.appendChild(BarStatRES)
            ContenaireBarreRES.appendChild(BarResistance)
            BarStatRES.appendChild(BarContRES)
            BarResistance.appendChild(TextRES)

            Recuperation.appendChild(ImgRecuperation)
            Recuperation.appendChild(ContenaireBarreREC)
            ContenaireBarreREC.appendChild(BarStatREC)
            ContenaireBarreREC.appendChild(BarRecuperation)
            BarStatREC.appendChild(BarContREC)
            BarRecuperation.appendChild(TextREC)
            
            Discipline.appendChild(ImgDiscipline)
            Discipline.appendChild(ContenaireBarreD)
            ContenaireBarreD.appendChild(BarStatD)
            ContenaireBarreD.appendChild(BarDiscipline)
            BarStatD.appendChild(BarContD)
            BarDiscipline.appendChild(TextD)

            Intelligence.appendChild(ImgIntelligence)
            Intelligence.appendChild(ContenaireBarreI)
            ContenaireBarreI.appendChild(BarStatI)
            ContenaireBarreI.appendChild(BarIntelligence)
            BarStatI.appendChild(BarContI)
            BarIntelligence.appendChild(TextI)

            Force.appendChild(ImgForce)
            Force.appendChild(ContenaireBarreF)
            ContenaireBarreF.appendChild(BarStatF)
            ContenaireBarreF.appendChild(BarForce)
            BarStatF.appendChild(BarContF)
            BarForce.appendChild(TextF)
            
        }, 3000);
    }
};

