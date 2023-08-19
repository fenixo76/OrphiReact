import "./App.css";
import config from "./Config.json";
import { exchangeCodeForTokens, getDestinyMembership, refreshAccesToken } from "./Bungie/ApiBungie";
import { getVendors } from "./Bungie/GetVendor";
import React, { useEffect, useState } from "react";

function App() {
  const [visibleConections, setVisibleConection] = useState(true)
  const [Chargement, setChargement] = useState(false)

  useEffect(() => {

    const CheckToken = async () => {
      const Token = JSON.parse(localStorage.getItem("SaveToken")) || [];
      if (Token.token) {
        setVisibleConection(false)
        setChargement(true)
      }
    }

    const handleAuthorizationCode = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const authorizationCode = urlParams.get("code");
      if (authorizationCode) {
        await exchangeCodeForTokens(authorizationCode);
        window.location.href = "https://localhost:8001/" 
      };
    }
    
    refreshAccesToken() // Recharge un Nouveau acces_token a chaque ouverture du navigateur 

    CheckToken() // VerifiCation si il y a un Token

    handleAuthorizationCode(); // Vérifiez s'il y a un code d'autorisation dans l'URL lors du chargement de la page
    
  }, []);

  const handleConnectionClick = () => {
    window.location.href = `${config.OAUTHURL}?response_type=code&client_id=${config.CLIENT_ID}`;
  };

  return (
    <div className="App">

      {visibleConections && (
        <div className="Contenaire_Conection">
          <h1>Connectez-vous à votre compte</h1>
          <button className="Button_01" onClick={handleConnectionClick}>Connexion</button>
        </div>
      )}

      {Chargement && (
        getDestinyMembership(),// Cargement des info User 
        <div className="loading-screen">
          <div className="loading-spinner1"></div>
          <div className="loading-spinner2"></div>
          <h1 className="loadingH">Chargement Des Pesonages</h1>
          <p className="loadingP"></p>
        </div>
      )}
      <div className="Personnage">
        
      </div>
      
    </div>

  );
}

export default App;
