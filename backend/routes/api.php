<?php

use App\Http\Controllers\API\AnneeScolaireController;
use App\Http\Controllers\API\EtudiantController;
use App\Http\Controllers\API\NiveauController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('annee-scolaires')->group(function () {
    Route::get('/', [AnneeScolaireController::class, 'getAll']);
    Route::get('/{id}', [AnneeScolaireController::class, 'get']);
    Route::post('/', [AnneeScolaireController::class, 'create']);
    Route::put('/{id}', [AnneeScolaireController::class, 'update']);
    Route::delete('/{id}', [AnneeScolaireController::class, 'delete']);
});

Route::prefix('etudiants')->group(function () {
    Route::get('/', [EtudiantController::class, 'getAll']);
    Route::get('/{id}', [EtudiantController::class, 'get']);
    Route::post('/', [EtudiantController::class, 'create']);
    Route::put('/', [EtudiantController::class, 'update']);
    Route::delete('/', [EtudiantController::class, 'delete']);
});

Route::prefix('niveaux')->group(function () {
    Route::get('/', [NiveauController::class, 'getAll']);
    Route::get('/{id}', [NiveauController::class, 'get']);
    Route::post('/', [NiveauController::class, 'create']);
    Route::put('/', [NiveauController::class, 'update']);
    Route::delete('/', [NiveauController::class, 'delete']);
});
