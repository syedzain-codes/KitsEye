import test from 'node:test';import assert from 'node:assert/strict';import {moderate} from '../services/moderation.js';
test('normal complaint is not flagged',()=>assert.equal(moderate('The classroom fan is not working').flagged,false));
test('keyword heuristic flags configured abusive words',()=>assert.equal(moderate('This is stupid').flagged,true));
test('Telugu configured keyword is detected',()=>assert.equal(moderate('ఇది చెత్త').flagged,true));
