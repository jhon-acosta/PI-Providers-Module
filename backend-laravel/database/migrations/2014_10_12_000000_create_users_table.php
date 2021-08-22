<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            /**
             * Primary Key
             */
            $table->id();
            /**
             * Foreign keys
             */
            $table->unsignedBigInteger('roleId');
            $table->unsignedBigInteger('typeId')->nullable();
            /**
             * Fileds
             */
            $table->string('numberIdentification', 13)->nullable();
            $table->string('names', 50)->nullable();
            $table->string('surnames', 50)->nullable();
            $table->string('email', 50)->unique();
            $table->string('password');
            $table->string('cellPhone', 10)->nullable();
            $table->string('markImage')->nullable()->nullable();
            $table->string('filePdf')->nullable();
            $table->string('codeForVerfication', 6)->nullable();
            $table->boolean('statusEmailVerified')->nullable();
            $table->string('province', 50)->nullable();
            $table->string('score', 50)->nullable();
            $table->string('bankAccount', 50)->nullable();
            /**
             * Relationship
             */
            $table->foreign('roleId')
                ->references('id')
                ->on('roles')
                ->onUpdate('cascade');
            
            $table->foreign('typeId')
                  ->references('id')
                  ->on('type_identificacions')
                  ->onUpdate('cascade');
            
            $table->timestamps();
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
