<?php

namespace App\Http\Controllers\Api\ModuleProviders;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\Api\ModuleProviders\UserResource;
use Illuminate\Support\Facades\Storage;

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
        $user->typeId = $request->typeId;
        $user->numberIdentification = $request->numberIdentification;
        $user->names = $request->names;
        $user->surnames = $request->surnames;
        $user->email = $request->email;
        $user->password = $request->password;
        $user->cellPhone = $request->cellPhone;
        $user->markImage = $request->markImage;
        $user->filePdf = $request->filePdf;
        $user->codeForVerfication = $request->codeForVerfication;
        $user->statusEmailVerified = $request->statusEmailVerified;
        $user->province = $request->province;

        if($user->save()){
            return new UserResource($user);
        }
    }

    public function show($id)
    {
        $user = User::findOrFail($id);
        return new UserResource($user);
    }

    public function edit($id)
    {
        $user = User::find($id);
        return new UserResource($user);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $dataUser = json_decode($request->user, true);
        if($user-> filePdf != $dataUser['filePdf']){
            Storage::disk('public')->delete($user -> filePdf); 
            $file = $request->file('filePdf');
            $pdf = $file->StoreAs('provider_pdf', $file->getClientOriginalName(), 'public');
            $user->filePdf=$pdf;
        }
        
        if($user-> markImage != $dataUser['markImage']){
            Storage::disk('public')->delete($user -> markImage); 
            $file = $request->file('fileImg');
            $img = $file-> storeAs('provider_img', $file->getClientOriginalName(), 'public');
            $user->markImage = $img;
        }
        $user->names = $dataUser['names'];
        $user->surnames = $dataUser['surnames'];
        // $user->password = $dataUser['password'];
        $user->cellPhone = $dataUser['cellPhone'];
        // $user->codeForVerfication = $dataUser['codeForVerfication'];
        // $user->statusEmailVerified = $dataUser['statusEmailVerified'];
        $user->province = $dataUser['province'];
 
        if($user->save()){
            return new UserResource($user);
        }
    }

    public function destroy($id)
    {
        if (DB::table('users')->where('id', $id)->delete()) {
            return response()->json([
                'data' => [
                    'id' => $id,
                    'message' => 'user deleted'
                ]
            ], 200);
        }
    }
}
