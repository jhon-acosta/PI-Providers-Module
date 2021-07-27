<?php

namespace App\Http\Controllers\Api\ModuleProviders;

use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Resources\Api\ModuleProviders\UserResource;

class UserController extends Controller
{
    public function index()
    {
        $users = User::paginate(20);
        return UserResource::collection($users);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $user = new User();
        $user->roleId = $request->roleId;
        $user->numberIdentification = $request->numberIdentification;
        $user->names = $request->names;
        $user->surnames = $request->surnames;
        $user->email = $request->email;
        $user->password = $request->password;
        $user->cellPhone = $request->cellPhone;
        $user->pathImage = $request->pathImage;
        $user->nameImage = $request->nameImage;
        $user->codeForVerfication = $request->codeForVerfication;
        $user->statusEmailVerified = $request->statusEmailVerified;

        if($user->save()){
            return new UserResource($user);
        }
    }

    public function show($id)
    {
        $user = User::findOrFail($id);
        return new UserResource($user);
    }

    public function edit(Role $role)
    {
        //
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->roleId = $request->roleId;
        $user->numberIdentification = $request->numberIdentification;
        $user->names = $request->names;
        $user->surnames = $request->surnames;
        $user->email = $request->email;
        $user->password = $request->password;
        $user->cellPhone = $request->cellPhone;
        $user->pathImage = $request->pathImage;
        $user->nameImage = $request->nameImage;
        $user->codeForVerfication = $request->codeForVerfication;
        $user->statusEmailVerified = $request->statusEmailVerified;

 
        if($user->save()){
            return new UserResource($user);
        }
    }

    public function destroy($id)
    {
        $user = Role::findOrFail($id);

        if ($user->delete()) {
            return new RoleResource($user);
        }
    }
}
