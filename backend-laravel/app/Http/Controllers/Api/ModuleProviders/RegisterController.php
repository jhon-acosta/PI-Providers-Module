<?php

namespace App\Http\Controllers\Api\ModuleProviders;

use App\Models\User;
use App\Mail\SendMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class RegisterController extends Controller
{
    public function register(Request $request) 
    {
        /**
         * Random number for verification code
         */
        $characters = '0123456789';
        $randomCode = substr(str_shuffle($characters), 0, 6);
        $dataUser=json_decode($request->user,true);
        $user = new User();
        if (DB::table('roles')->where('id', $dataUser['roleId'])->value('description') === 'Proveedor'){
            $file=$request->file('file');
            $pdf=$file->storeAs('provider_pdf', $file->getClientOriginalName(),'public');
            $user->filePdf = $pdf;

            $img ='https://img.icons8.com/ultraviolet/80/000000/user.png';
            $user->markImage = $img;
        }
       
        $img ='https://img.icons8.com/ultraviolet/80/000000/user.png';
        
        $user->roleId = $dataUser['roleId'];
        $user->typeId = $dataUser['typeId'];
        $user->numberIdentification = $dataUser['numberIdentification'];
        $user->names = $dataUser['names'];
        $user->surnames = $dataUser['surnames'];
        $user->email = $dataUser['email'];
        $user->cellPhone = $dataUser['cellPhone'];
        $user->markImage = $img;
        $user->province = $dataUser['province'];
        $user->codeForVerfication = $randomCode;
        $user->statusEmailVerified = 0;
        /**
         * Password encryption
         */
        $passwordMoreSomething = "3CV{$dataUser['password']}5H0PpH1n";
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
                    'email' => $user->email,
                ],
                'message' =>[
                    'summary'=>'Successfully created'
                ]
            ], 201);
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

    public function authGoogle (Request $request) 
    {
        $user = new User();
        $user->roleId = $request->roleId;
        $user->email = $request->email;
        $user->names = $request->names; 
        $user->surnames = $request->surnames; 
        $user->cellPhone = $request->cellPhone;
        
        $passwordMoreSomething = "3CV{$request->password}5H0PpH1n";
        $user->password = Hash::make($passwordMoreSomething);
        if($user->save()){
            return response()->json([
                'data' => [
                    'email' => $user->email,
                ]
            ], 201);
        }
    }
}
