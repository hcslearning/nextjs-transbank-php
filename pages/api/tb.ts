import { NextApiRequest, NextApiResponse } from "next"
import Transbank from 'transbank-sdk'
import * as Nunjucks from 'nunjucks'

function getTransaccion() {
    return new Transbank.Webpay(
        Transbank.Configuration.forTestingWebpayPlusNormal()
    ).getNormalTransaction() 
}


export default async (req:NextApiRequest, res:NextApiResponse) => {
    
    const transaccion = getTransaccion()

    const amount = 48990
    const sessionId = '123456'
    const buyOrder = 100500
    const returnUrl = 'http://localhost:3000'
    const finalUrl = 'http://localhost:3000/comprobante'

    try {
        const resultado = await transaccion.initTransaction( amount, buyOrder, sessionId, returnUrl, finalUrl )    
        console.dir( resultado )
        const nunjucks = Nunjucks.configure('views', {autoescape: true})
        const html = nunjucks.render('formulario.html', {
            token: resultado.token,
            url: resultado.url 
        })
        res.write( html )
        res.end()
        return 
    } catch (error) {
        console.dir( error )
        res.status(500).json( error )
        return
    }
    
}