<?php

use App\Http\Controllers\API\AnneeScolaireController;
use App\Http\Controllers\API\EtudiantController;
use App\Http\Controllers\API\EnseignantController;
use App\Http\Controllers\API\NiveauController;
use App\Http\Controllers\API\ParcourController;
use App\Http\Controllers\API\PersonneController;
use App\Http\Controllers\API\NoteController;
use App\Http\Controllers\API\UniteEnseignementController;
use App\Http\Controllers\API\SemestreController;
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
    Route::put('/{id}', [EtudiantController::class, 'update']);
    Route::delete('/{id}', [EtudiantController::class, 'delete']);
});

Route::prefix('notes')->group(function () {
    Route::get('/', [NoteController::class, 'getAll']);
    Route::get('/{id}', [NoteController::class, 'get']);
    Route::post('/', [NoteController::class, 'create']);
    Route::put('/{id}', [NoteController::class, 'update']);
    Route::delete('/{id}', [NoteController::class, 'delete']);
});

Route::prefix('unite-enseignements')->group(function () {
    Route::get('/', [UniteEnseignementController::class, 'getAll']);
    Route::get('/{id}', [UniteEnseignementController::class, 'get']);
    Route::post('/', [UniteEnseignementController::class, 'create']);
    Route::put('/{id}', [UniteEnseignementController::class, 'update']);
    Route::delete('/{id}', [UniteEnseignementController::class, 'delete']);
});

Route::prefix('enseignants')->group(function () {
    Route::get('/', [EnseignantController::class, 'getAll']);
    Route::get('/{id}', [EnseignantController::class, 'get']);
    Route::post('/', [EnseignantController::class, 'create']);
    Route::put('/{id}', [EnseignantController::class, 'update']);
    Route::delete('/{id}', [EnseignantController::class, 'delete']);
});
Route::prefix('niveaux')->group(function () {
    Route::get('/', [NiveauController::class, 'getAll']);
    Route::get('/{id}', [NiveauController::class, 'get']);
    Route::post('/', [NiveauController::class, 'create']);
    Route::put('/{id}', [NiveauController::class, 'update']);
    Route::delete('/{id}', [NiveauController::class, 'delete']);

    // semestres
    Route::get('/semestres/liste', [SemestreController::class, 'getAll']);
    Route::get('/semestres/{id}', [SemestreController::class, 'get']);
    Route::post('/semestres', [SemestreController::class, 'create']);
    Route::put('/semestres/{id}', [SemestreController::class, 'update']);
    Route::delete('/semestres/{id}', [SemestreController::class, 'delete']);
});

Route::prefix('parcours')->group(function () {
    Route::get('/', [ParcourController::class, 'getAll']);
    Route::get('/{id}', [ParcourController::class, 'get']);
    Route::post('/', [ParcourController::class, 'create']);
    Route::put('/{id}', [ParcourController::class, 'update']);
    Route::delete('/{id}', [ParcourController::class, 'delete']);
});

Route::prefix('personnes')->group(function () {
    Route::get('/', [PersonneController::class, 'getAll']);
    Route::get('/{id}', [PersonneController::class, 'get']);
    Route::post('/', [PersonneController::class, 'create']);
    Route::put('/{id}', [PersonneController::class, 'update']);
    Route::delete('/{id}', [PersonneController::class, 'delete']);
});
