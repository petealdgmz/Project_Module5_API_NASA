const express = require("express")
const app = express()
const port = 3000
require("./routes")(app)



app.listen(port, () => {
    console.log(`Escuchando desde el puerto ${port}`)
})

//subir en el de la trivia