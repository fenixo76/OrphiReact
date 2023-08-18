import config from "../Config.json"
import axios from "axios";
import { getCharter } from "./GetCharacters";

let charterFetched = false;

//sauvegarde Tokens
function SaveToken(SaveTokens) {
    localStorage.setItem("SaveToken", JSON.stringify(SaveTokens));
}
//Sauvegarde info Utilisateur
function SaveInfoUser(SaveInfoUser) {
    localStorage.setItem("SaveInfoUser", JSON.stringify(SaveInfoUser));
}

export const bungie = axios.create({
    baseURL: "https://www.bungie.net/",
    timeout: 10000,
    withCredentials: true,
    headers: {
        "X-API-Key": config.API_KEY,
    }
}
)

//Recuperation et Sauvegarde des Token
export const exchangeCodeForTokens = async (code) => {
    try {
        const params = new URLSearchParams();
        params.append("client_id", config.CLIENT_ID);
        params.append("client_secret", config.CLIENT_SECRET);
        params.append("grant_type", "authorization_code");
        params.append("code", code);

        const response = await bungie.post(
            "/Platform/App/oauth/token/",
            params,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
        );

        const { access_token, expires_in, refresh_token, refresh_expires_in, membership_id } = response.data;

        const infoToken = {
            token: access_token,
            dateToken: expires_in,
            refreshToken: refresh_token,
            dateRefreshToken: refresh_expires_in,
            membership: membership_id,
        }

        SaveToken(infoToken)

        
    } catch (error) {
        console.error("Erreur lors de l'échange du code :", error);
        if (error.response) {
            console.error("Réponse de l'API Bungie :", error.response.data);
            console.error("Statut de la réponse :", error.response.status);
        }
    }
};

//Recuperation et sauvegarde des Info Utilisateur
export const getDestinyMembership = async () => {

    const Token = JSON.parse(localStorage.getItem("SaveToken")) || [];

    try {
        const response = await bungie.get(`/Platform/User/GetMembershipsById/${Token.membership}/-1/`, {
            headers: {
                Authorization: `Bearer ${Token.token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const membershipId = response.data.Response.destinyMemberships[0].membershipId
        const membershipType = response.data.Response.destinyMemberships[0].membershipType

        const infoUser = {
            membershipId: membershipId,
            membershipType: membershipType,
        }

        SaveInfoUser(infoUser)

        const Info = JSON.parse(localStorage.getItem("SaveInfoUser")) || [];

        if (!charterFetched) {
            charterFetched = true;
            getCharter(Info.membershipType, Info.membershipId, Token.token);
        }



    } catch (error) {
        console.log(error);
    }
};

export const refreshAccesToken = async () => {

    const Token = JSON.parse(localStorage.getItem("SaveToken")) || [];

    try{
        const params = new URLSearchParams();
        params.append("client_id", config.CLIENT_ID);
        params.append("client_secret", config.CLIENT_SECRET);
        params.append("grant_type", "refresh_token");
        params.append("refresh_token", Token.refreshToken);
        

        const response = await bungie.post(
            "/Platform/App/oauth/token/",
            params,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
        );

        const newToken = response.data.access_token;
        Token.token = newToken

        SaveToken(Token)

    }catch (erreur) {
        console.log("oups : ", erreur)
    }
}
