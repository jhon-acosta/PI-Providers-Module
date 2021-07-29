<?php

namespace App\Http\Controllers\Api\ModuleProviders;

use App\Models\Api\ModuleProviders\TypeIdentificacion;
use Illuminate\Http\Request;
use App\Http\Resources\Api\ModuleProviders\TypeIdentificationResource;

class TypeIdentificacionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $typeIdentificacions= TypeIdentificacion::all();
        return $typeIdentificacions;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $typeIdentificacion = new TypeIdentificacion();
        $typeIdentificacion->description= $request->description;
        if($typeIdentificacion->save()){
            return new TypeIdentificationResource($typeIdentificacion);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Api\ModuleProviders\TypeIdentificacion  $typeIdentificacion
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $typeIdentificacion = TypeIdentificacion::findOrFail($id);
        return new TypeIdentificationResource($typeIdentificacion);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Api\ModuleProviders\TypeIdentificacion  $typeIdentificacion
     * @return \Illuminate\Http\Response
     */
    public function edit(TypeIdentificacion $typeIdentificacion)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Api\ModuleProviders\TypeIdentificacion  $typeIdentificacion
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $typeIdentificacion = TypeIdentificacion::findOrFail($id);
        $typeIdentificacion->description = $request->description;
        if($typeIdentificacion->save()){
            return new TypeIdentificationResource($typeIdentificacion);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Api\ModuleProviders\TypeIdentificacion  $typeIdentificacion
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $typeIdentificacion = TypeIdentificacion::findOrFail($id);
        if($typeIdentificacion->delete()){
            return new TypeIdentificationResource($typeIdentificacion);
        }
    }
}
