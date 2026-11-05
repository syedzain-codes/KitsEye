// Transparent keyword heuristic only. It flags for human review; it does not decide whether a complaint is valid.
const terms=['idiot','stupid','bastard','bloody','చెత్త','వెధవ','మూర్ఖుడు','गधा','बेवकूफ','हरामी'];
export function moderate(text=''){const normalized=text.normalize('NFKC').toLocaleLowerCase().replace(/[\u200B-\u200D\uFEFF]/g,'');const hits=terms.filter(term=>normalized.includes(term));return {flagged:hits.length>0,reasons:hits.length?[`Potential abusive language: ${hits.join(', ')}`]:[]};}
