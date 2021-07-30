<?php

namespace App\Http\Controllers\Api\ModuleProviders;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    public function register(Request $request) 
    {
        /**
         * Random number for verification code
         */
        $characters = '0123456789';
        $randomCode = substr(str_shuffle($characters), 0, 6);

        $user = new User();
        $user->roleId = $request->roleId;
        $user->typeId = $request->typeId;
        $user->numberIdentification = $request->numberIdentification;
        $user->names = $request->names;
        $user->surnames = $request->surnames;
        $user->email = $request->email;
        $user->cellPhone = $request->cellPhone;
        $user->pathImage = $request->pathImage;
        $user->nameImage = $request->nameImage;
        $user->codeForVerfication = $randomCode;
        $user->statusEmailVerified = 0;
        /**
         * Password encryption
         */
        $passwordSalt = '3CV'.$request->password.'5H0PpH1n';
        $user->password = Hash::make($passwordSalt);
        /**
         * Validation for mail
         */
        if (DB::table('users')->where('email', $user->email)->first()) {
            return response()->json([
                'data' => [
                    'message' => 'email already registered'
                ]
            ], 409);
        };
        /**
         * Successful response 
         */
        if($user->save()){
            return response()->json([
                'data' => [
                    'id' => $user->id,
                    'typeId' => $user->typeId,
                    'email' => $user->email,
                    'codeForVerfication' => $user->codeForVerfication,
                ]
            ], 200);
        }
    }
}
