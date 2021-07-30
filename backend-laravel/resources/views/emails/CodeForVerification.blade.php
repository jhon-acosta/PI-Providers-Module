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
            background-color: #dd6b20;
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
            border-radius: 5%;
            box-shadow: 3px 3px 0px darkslategrey;
        }
        .testimonial .testimonial-item img {
            margin: 0 auto;
            width: 120px;
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
    </style>
</head>

<body>
    <div class="testimonial wow fadeInUp" data-wow-delay="0.1s">
        <div class="owl-carousel testimonials-carousel">
            <div class="testimonial-item">
                <div class="testimonial-img">
                  <!-- image -->
                </div>
            </div>
            <div class="testimonial-item">
                <h3>Clave temporal: </h3>
                <div class="testimonial-password">
                    <h2>{{ $details [ 'body'] }}</h2>
                </div>
                <h3>Indicaciones: </h3>
                <p> * Copié la clave generada temporalmente. </p>
                <p> * Inicié sesión y actualicé su contraseña. </p>
                <h6>&#169; 2021 Todos los derechos reservados</h6>
            </div>
        </div>
    </div>
    </div>
    </div>
</body>

</html>