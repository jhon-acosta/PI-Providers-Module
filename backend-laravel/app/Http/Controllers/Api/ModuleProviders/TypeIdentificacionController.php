<?php

namespace App\Http\Controllers\Api\ModuleProviders;

use App\Models\Api\ModuleProviders\TypeIdentificacion;
use Illuminate\Http\Request;
use App\Http\Resources\Api\ModuleProviders\TypeIdentificationResource;

class TypeIdentificacionController extends Controller
{
    public function index()
    {
        $typeIdentificacions= TypeIdentificacion::paginate(20);
        return TypeIdentificationResource::collection($typeIdentificacions);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $typeIdentificacion = new TypeIdentificacion();
        $typeIdentificacion->description= $request->description;
        if($typeIdentificacion->save()){
            return new TypeIdentificationResource($typeIdentificacion);
        }
    }

    public function show($id)
    {
        $typeIdentificacion = TypeIdentificacion::findOrFail($id);
        return new TypeIdentificationResource($typeIdentificacion);
    }

    public function edit(TypeIdentificacion $typeIdentificacion)
    {
        //
    }

    public function update(Request $request, $id)
    {
        $typeIdentificacion = TypeIdentificacion::findOrFail($id);
        $typeIdentificacion->description = $request->description;
        if($typeIdentificacion->save()){
            return new TypeIdentificationResource($typeIdentificacion);
        }
    }

    public function destroy($id)
    {
        $typeIdentificacion = TypeIdentificacion::findOrFail($id);
        if($typeIdentificacion->delete()){
            return new TypeIdentificationResource($typeIdentificacion);
        }
    }
}
