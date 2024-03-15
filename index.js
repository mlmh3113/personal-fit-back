import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import { db } from './config/db.js'
import studentsRoutes from './routes/studentsRoutes.js'
import postsRoutes from './routes/postsRoutes.js'
import comentariesRoute from './routes/comentariesRoutes.js'
import cors from 'cors';


// variables de entorno
dotenv.config()
// configurar App
const app = express()

  
const whiteList = [ process.env.FRONTEND_URL,undefined ];

const corsOptions = {
    origin : function(origin, callback) {
        if(whiteList.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Error de Cors'));
        }
    }
}

  app.use(cors(corsOptions));

// permitir que la app reciba json
app.use(express.json())
// definir puerto
const port = process.env.PORT || 4000
// definir rutas
app.use('/api/students', studentsRoutes)
app.use('/api/posts', postsRoutes)
app.use('/api/comentaries', comentariesRoute)

// conectar DB
db()
// habilitar cors




// arrancar el servidor
app.listen(port, () => {
    console.log(colors.blue(`App Running on the PORT:${port}`))
})
