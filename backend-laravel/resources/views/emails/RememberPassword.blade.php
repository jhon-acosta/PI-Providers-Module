<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $details [ 'title'] }}</title>
    <style>
        .testimonial {
            position: relative;
            padding: 45px 0;
            background-color: #ff6a00;
            font-family: 'Ubuntu';
        }

        .testimonial .container {
            padding: 0;
        }

        .testimonial .testimonial-item {
            position: relative;
            margin: 0 15px;
            text-align: center;
        }

        .testimonial .testimonial-password {
            padding: 3px;
            background: #ffffff;
            display: inline-flex;
            text-align: center;
            border-radius: 15px;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
            text-align: center;
        }

        .testimonial .testimonial-item .imgLogo {
            margin: 0 auto;
            width: 20%;
            padding: 13px;
            border-radius: 100px;
            border: 1px solid rgba(0, 0, 0, .07);
            background: #ffffff;
            transition: .5s;
        }
        
        .testimonial .testimonial-item p {
            font-size: 16px;
            color: #fdfdfd;
        }

        @media only screen and (max-width: 600px) {
            .testimonial .testimonial-item img {
            margin: 0 auto;
            width: 40%;
            padding: 13px;
            border-radius: 100px;
            border: 1px solid rgba(0, 0, 0, .07);
            background: #ffffff;
            transition: .5s;
        }
        }
    </style>
</head>

<body>
    <div class="testimonial wow fadeInUp" data-wow-delay="0.1s">
        <div class="owl-carousel testimonials-carousel">
            <div class="testimonial-item">
                <div class="testimonial-img">
                    <img class="imgLogo" src="https://firebasestorage.googleapis.com/v0/b/full-stack-courses.appspot.com/o/Redes%2FWhatsApp%20Image%202021-08-17%20at%2010.41.35%20AM.jpeg?alt=media&token=27628499-1439-471d-8d1a-e8413de46d9a" alt="Image">
                </div>
            </div>
            <div class="testimonial-item">
                <h2 style="color: white;"> ACTUALIZACIÓN DE CONTRASEÑA </h2>
                <p style="text-align: center; color: black;">Inicie sesión:</p>
                <div class="testimonial-password">
                    <h2>{{ $details [ 'body'] }}</h2>
                </div>
                <p style="text-align: center; font-weight: bold;">
                  Tenga en cuenta de la contraseña es de carácter confidencial. <br>
                  Se recomienda actualizar.
                </p>
                <p style="text-align: center; color: black;">
                    Continúa realizando compras desde la comodidad de tu casa
                    <br>
                    Los mejores precios del país
                </p>
                <img style="width:5%" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Flag_of_Ecuador_%281900%E2%80%932009%29.svg/300px-Flag_of_Ecuador_%281900%E2%80%932009%29.svg.png" alt="Image">


                <h6>&#169; 2021 Todos los derechos reservados</h6>
            </div>
        </div>
    </div>
    </div>
    </div>
</body>

</html>