<?php

namespace App\Http\Controllers\Api\ModuleProviders;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = User::paginate(20);
        return RoleResource::collection($users);
    }

    public function create()
    {
        $user = new User();
        $user->numberIdentification = $request->numberIdentification;
        $user->names = $request->names;
        $user->surnames = $request->surnames;
        $user->email = $request->email;
        $user->password = $request->password;
        $user->cellPhone = $request->cellPhone;
        $user->pathImage = $request->pathImage;
        $user->nameImage = $request->nameImage;
        $user->codeForVerfication = $request->codeForVerfication;
        $user->statusEmailVerified = $request->nameImage;

        if($user->save()){
            return new RoleResource($user);
        }
    }

    public function store(Request $request)
    {
       //
    }

    public function show($id)
    {
        $role = User::findOrFail($id);
        return new RoleResource($role);
    }

    public function edit(Role $role)
    {
        //
    }

    public function update(Request $request, Role $role)
    {
        //
    }

    public function destroy(Role $role)
    {
        //
    }
}
