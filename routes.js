module.exports = function(app){
    const axios = require("axios")
    
    // const url1 = "https://api.nasa.gov/planetary/apod?api_key=dVIaY8x1dSf7g6OCCcDufyLfLfXjmwTQ6rMdOs1Q"

    // const url2 = "https://api.nasa.gov/EPIC/api/natural/images?api_key=dVIaY8x1dSf7g6OCCcDufyLfLfXjmwTQ6rMdOs1Q"


    const url3 = "https://api.nasa.gov/neo/rest/v1/feed"

    const  apiKey = "dVIaY8x1dSf7g6OCCcDufyLfLfXjmwTQ6rMdOs1Q"



    app.get('/', async (req, res) => {

        // const {api_key} = req.query

        // if(!api_key){
        //     return res.status(400).json({error: "Debe proporcionar la clave correspondiente "})
        // }

        try {

            const response = await axios.get(url3, {
                params: {
                    api_key: apiKey
                }
            })
            const data = response.data
            res.status(200).json(data)
        } catch (error) {
            console.log(`Ha ocurrido un error al obtener los datos: ${error}`)
            res.status(400).json({ error: "Error al obtener los datos" })
        }
    })


    //Recibir query params
    //http://localhost:3000/date?start_date=2015-09-07&end_date=2015-09-08&api_key=dVIaY8x1dSf7g6OCCcDufyLfLfXjmwTQ6rMdOs1Q

    app.get('/date', async (req, res) => {
        const {start_date, end_date, api_key} = req.query

        if(!start_date || !end_date){ 
            return res.status(400).json({error: "Debe proporcionar la fecha inicial y fecha final"})
        }
        if(!api_key){
            return res.status(400).json({error: "Debe proporcionar la clave correspondiente "})
        }

        try{
            const response = await axios.get(url3, {
                params: {
                    start_date: start_date,
                    end_date: end_date,
                    api_key: apiKey
                }
            })
            const data = response.data
            res.status(200).json(data)
            

        } catch(error){
            console.log(`Ha ocurrido un error: ${error}`)
            res.status(400).json({error: "Error al mostrar los datos"})
        }
    })


    //Asteroides por id
    //http://localhost:3000/54100203
    //http://localhost:3000/3879527
    //http://localhost:3000/3797901
    //http://localhost:3000/3768609
    //http://localhost:3000/2523728

    app.get('/:id', async (req, res) =>{
        try {
            let asteroidId = req.params.id

            const asteriodApi = `https://api.nasa.gov/neo/rest/v1/neo/${asteroidId}?api_key=${apiKey}`

            const response = await axios.get(asteriodApi)

            if(response.data){
                res.status(200).json(response.data)
            } else {
                res.status(404).json({error: "ID no encontrada"})
            }

        } catch (error) {
            console.log(`Ha ocurrido un error: ${error}`)
            res.status(400).json({error: "Error al mostrar los datos"})
        }
    })
}


