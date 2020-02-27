import { prisma } from "../../../generated/prisma-client";
import { mustBeLoggedIn } from "../../../helpers/auth";
import { USE_AUTH } from "../../../environments";


export default {
    Mutation: {
        createForSale: async (_, { input: { vinyls, pricePcs, priceTotal, isSale } }, { currentUser }) => {

            if (USE_AUTH == 'true') {
                mustBeLoggedIn(currentUser)
            }
            if (vinyls.length === 0) {
                throw new Error("Anna vähintään yksi levy!")
            }
            let tempTotal = ""

            if (pricePcs && pricePcs.length > 0) {
                tempTotal = vinyls.length * pricePcs
            }

            //tarkistetaan onko levy jo myynnissä
            for (var i = 0; i < vinyls.length; i++) {
                const is = await prisma.vinyl({ id: vinyls[i] }).forSale()
                if (is) {
                    throw new Error("Osa levyistä on jo myynnissä")
                }
            }


            var vinylsTemp = []; // temp
            let temp = []

            vinyls.map(x => {
                temp.push({ id: x });
            });




            vinylsTemp = { connect: temp }
            const total = priceTotal ? priceTotal : tempTotal.toString()

            const forSale = await prisma.createForSale({
                vinyls: vinylsTemp,
                pricePcs: pricePcs,
                priceTotal: total
            })

            await prisma.updateManyVinyls({
                where: {
                    id_in: vinyls
                },
                data: {
                    forSale: isSale
                }
            })

            return { forSale }
        }
    }
}

