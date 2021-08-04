<?php

namespace App\Http\Controllers\Api\ModuleProviders;

use App\Models\User;
use App\Mail\SendMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

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
        $user->markImage = $request->markImage;
        $user->filePdf = $request->filePdf;
        $user->province = $request->province;
        $user->codeForVerfication = $randomCode;
        $user->statusEmailVerified = 0;
        /**
         * Password encryption
         */
        $passwordMoreSomething = '3CV'.$request->password.'5H0PpH1n';
        $user->password = Hash::make($passwordMoreSomething);
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
         * Send mail for verified
         */
        $details = [
            'title' => 'Código de verificación',
            'body' => $user->codeForVerfication
        ];
        Mail::to($user->email)->send(new SendMail($details));

        /**
         * Successful response 
         */
        if($user->save()){
            return response()->json([
                'data' => [
                    'id' => $user->id,
                    'typeId' => $user->typeId,
                    'email' => $user->email,
                ]
            ], 200);
        }
    }

    public function accountVerification (Request $request) 
    {
        /**
         * Verified the existence of an account
         */
        if ($user = DB::table('users')->where('email', $request->email)->first()) 
        {
            /**
             * Code validation
             */
            if ($user->codeForVerfication === $request->codeForVerfication) {
                /**
                 * StatusEmailVerified update
                 */
                if (DB::table('users')->where('id', $user->id)
                        ->update(['statusEmailVerified' => 1]))
                {
                    return response()->json([
                        'data' => [
                            'id' => $user->id,
                            'email' => $user->email,
                        ]
                    ]);
                } 
                return response()->json([
                    'error' => [
                        'message' => 'error verifying account'
                    ]
                ]);    
            }
            return response()->json([
                'error' => [
                    'message' => 'error in code verification'
                ]
            ]);
        }
        return response()->json([
            'error' => [
                'message' => 'Account not found'
            ]
        ]);
    }
}
