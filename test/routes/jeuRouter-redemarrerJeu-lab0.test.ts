// Vous devez insérer les nouveaux tests ici
import { assert } from 'console';
import 'jest-extended';
import { Joueur } from '../../src/core/joueur';
import request from "supertest";
import app from '../../src/app';
import { jeuRoutes } from '../../src/routes/jeuRouter';

let joueur1 : Joueur;
let joueur2 : Joueur;

beforeAll(async () => {

  joueur1 = new Joueur('Simon');
  joueur2 = new Joueur('Jean');
});

describe('GET /api/v1/jeu/redemarrerJeu', () => {
  it("Scénario principal", async () => {
    const response = await request(app).get('/api/v1/jeu/redemarrerJeu');
    expect(response.status).toBe(200);
    expect((await response).headers['content-type']).toMatch(/json/);
  });

  it("Aucun joueur restant", async () => {
    await request(app).get('/api/v1/jeu/redemarrerJeu');
    const joueurs = JSON.parse(jeuRoutes.controleurJeu.joueurs);
    expect(joueurs.length).toBe(0);
  });
});
