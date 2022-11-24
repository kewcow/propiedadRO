import {serve} from './deps.ts';
import {headers} from './header.ts';
import {home} from './router.ts';

const handler = async (req: Request): Promise<Response> => {
  const pathname = new URL(req.url).pathname;
  if (pathname === '/') return home();
  if (pathname === '/emprendimientos') return home();
  if (pathname === '/departamentos') return home();
  if (pathname === '/contacto') return home();

  const css = await Deno.readFile(`${Deno.cwd()}/dist${pathname}`);
  if (pathname.split('.').at(-1) === 'css') return new Response(css, headers('css'));

  const js = await Deno.readFile(`${Deno.cwd()}/dist${pathname}`);
  return new Response(js, headers('js'));
}

const env = Deno.env.get('PORT');
const port = env ? Number(env) : 3500;

serve(handler, {port});
