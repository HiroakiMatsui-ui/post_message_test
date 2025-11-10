// server/middleware/auth.ts

import { defineEventHandler, getHeader, getCookie, setCookie, sendError, createError } from 'h3';

export default defineEventHandler((event) => {
  // -------------------------------------------------------------
  // ① 環境変数からIDとパスワードを取得
  // -------------------------------------------------------------
  const correctUser = 'dcm';
  const correctPass = 'dcm1234';

  // -------------------------------------------------------------
  // ② まずは認証済みのCookieがあるかチェック
  // -------------------------------------------------------------
  const sessionCookie = getCookie(event, 'my-session-cookie');
  if (sessionCookie === 'authenticated') {
    // 有効なCookieがあれば、何もせず後続の処理に進む
    return;
  }

  // -------------------------------------------------------------
  // ③ Cookieがなければ、Basic認証のヘッダーをチェック
  // -------------------------------------------------------------
  const authHeader = getHeader(event, 'authorization');

  if (authHeader && authHeader.startsWith('Basic ')) {
    const encodedCredentials = authHeader.substring(6);
    const decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString('utf8');
    const [username, password] = decodedCredentials.split(':');

    if (username === correctUser && password === correctPass) {
      // 認証成功！
      // Cookieを設定して、次からのアクセスを許可する
      setCookie(event, 'my-session-cookie', 'authenticated', {
        httpOnly: true, // JavaScriptからCookieを読めなくするセキュリティ対策
        path: '/',      // サイト全体で有効なCookie
      });
      // 認証に成功したので、後続の処理に進む
      return;
    }
  }

  // -------------------------------------------------------------
  // ④ 認証に失敗した場合、401 Unauthorizedエラーを返す
  // -------------------------------------------------------------
  // このヘッダーを送ることで、ブラウザはID/PWの入力ダイアログを表示する
  event.node.res.setHeader('WWW-Authenticate', 'Basic realm="Restricted Area"');
  // 401エラーを送信
  return sendError(event, createError({
    statusCode: 401,
    statusMessage: 'Unauthorized',
  }));
});