
Proyecto-Integrador

Proyecto integrador paralelos A y B replica de la página Alibaba, Tienda virtual.

Para la creación de Controllers, Models, Resources, Exceptions, Factories, Services, Components, Views se debe seguir la siguiente normativa:

Guiarse según su grupo.

php artisan make:controller Api/SupplierRegistration/nombreDelControlador + Controller.

php artisan make:controller Api/BuyersRegistration/nombreDelControlador + Controller.

php artisan make:controller Api/ImplementationGallery/nombreDelControlador + Controller.

php artisan make:controller Api/PaymentSecurity/nombreDelControlador + Controller.

php artisan make:controller Api/Chatbox/nombreDelControlador + Controller.

php artisan make:controller Api/Address Register/nombreDelControlador + Controller.

Todos los nombres de carpetas, archivos, nombres de los campos, nombres de las funciones, etc, deben ir en Inglés y usar Nomenclatura CamelCase.

Para la creación de una Ruta se debe seguir el siguiente formato:

Se debe importar el controlador use App\Http\Controllers\Api\SupplierRegistration\UsersController;

Y después se debe colocar la ruta. Route::get('users', [UsersController::class, 'index']);

Para Hacer los commit se debe especificar el titulo y la descripcion bien detallada de cada commit.

Recomendable usar el entorno gráfico de Visual Studio Code para subir los cambios.

Nota no crear carpetas ni eliminar la estructura base del proyecto.
