import { bungie } from "./ApiBungie";
import { Components } from "./Components";
import manifest from "./Manifest";

export const getVendors = async (VendorsCompenents) => {
    const Token = JSON.parse(localStorage.getItem("SaveToken")) || [];
    const Info = JSON.parse(localStorage.getItem("SaveInfoUser")) || [];

    const response = await bungie.get(
        `Platform/Destiny2/${Info.membershipType}/Profile/${Info.membershipId}/Character/${
            Info.Arcanistes.characterId || Info.Titans.characterId || Info.Chasseurs.characterId
        }/Vendors/?components=${Components.VendorSales},${Components.Vendors}`,
        {
            headers: {
                Authorization: `Bearer ${Token.token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
    );

    await manifest.fetchManifest();

    const VendorHash = response.data.Response.vendors.data[VendorsCompenents].vendorHash
    const VendorName = manifest.num(VendorHash).displayProperties.name

    const ItemData = response.data.Response.sales.data
    const Item = Object.values(ItemData[VendorsCompenents].saleItems)
    const ItemHash = Item.map(({itemHash}) => itemHash)

    const AllItem = ItemHash.slice(0, 30).map(async (hash) => {
        const Item = manifest.num(hash)
        const NameItem = Item.displayProperties.name
        const IconItem = Item.displayProperties.icon
        return {name:NameItem, icon:IconItem}
    })

    const results = await Promise.all(AllItem)
    const name = results.map(item => item.name)
    const icon = results.map(item => item.icon)

    console.log(`Vendor : ${VendorName} Article: ${name} icon: ${icon}`);
};
