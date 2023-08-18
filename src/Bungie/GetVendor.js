import { bungie } from "./ApiBungie";
import { Components } from "./Components";
import manifest from "./Manifest";

export const getVendors = async () => {
    const Token = JSON.parse(localStorage.getItem("SaveToken")) || [];
    const Info = JSON.parse(localStorage.getItem("SaveInfoUser")) || [];

    const response = await bungie.get(
        `Platform/Destiny2/${Info.membershipType}/Profile/${Info.membershipId}/Character/${
            Info.Arcanistes.characterId || Info.Titans.characterId || Info.Chasseurs.characterId
        }/Vendors/?components=${Components.VendorSales}`,
        {
            headers: {
                Authorization: `Bearer ${Token.token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
    );

    const Banshee = response.data.Response.sales.data;
    const Data = Object.values(Banshee[Components.Banshee].saleItems);
    const BansheeData = Data.map(({ itemHash }) => itemHash);

    await manifest.fetchManifest();

    const promises = BansheeData.slice(0, 21).map(async (hash) => {
        const item = manifest.num(hash);
        return item.displayProperties.name;
    });

    const results = await Promise.all(promises);
    console.log(results);
};
