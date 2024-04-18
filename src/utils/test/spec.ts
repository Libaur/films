import { checkStatus, emailPattern, jwtPattern, defineDisplayedContent } from '..';
import {
  displayed,
  undisplayed,
  genresData,
  mockValidToken,
  mockInvalidToken,
  mockValidMail,
  mockValidGmail,
  mockInvalidMail,
  mockInvalidGmail,
} from './mock-data';

test('request was successful', () => {
  const ok = checkStatus(200);
  const created = checkStatus(201);

  expect(ok).toBe(true);
  expect(created).toBe(true);
});

test('request failed', () => {
  const axiosError = checkStatus(400);
  const notFound = checkStatus(404);
  const internalError = checkStatus(500);

  expect(axiosError).toBe(false);
  expect(notFound).toBe(false);
  expect(internalError).toBe(false);
});

test('email is valid', () => {
  const validMail = emailPattern.test(mockValidMail);
  const validGmail = emailPattern.test(mockValidGmail);

  expect(validMail).toBe(true);
  expect(validGmail).toBe(true);
});

test('email is invalid', () => {
  const invalidMail = emailPattern.test(mockInvalidMail);
  const invalidGmail = emailPattern.test(mockInvalidGmail);

  expect(invalidMail).toBe(false);
  expect(invalidGmail).toBe(false);
});

test('token is valid', () => {
  const validToken = jwtPattern.test(mockValidToken);

  expect(validToken).toBe(true);
});

test('token is invalid', () => {
  const invalidToken = jwtPattern.test(mockInvalidToken);

  expect(invalidToken).toBe(false);
});

test('displayedContent = byGenres', () => {
  const byGenres = defineDisplayedContent({
    byFame: undisplayed,
    bySearch: [],
    byYears: [],
    byGenres: displayed,
    genres: genresData,
  });
  const correctSort = byGenres.find(data => data.title === 'displayed');

  expect(correctSort).toBeDefined();
});

test('displayedContent != byFame', () => {
  const byFame = defineDisplayedContent({
    byFame: displayed,
    bySearch: [],
    byYears: [],
    byGenres: undisplayed,
    genres: genresData,
  });
  const correctSort = byFame.find(data => data.title === 'undisplayed');

  expect(correctSort).toBeDefined();
});
