// Polyfills para MSW en Node.js - DEBE IR PRIMERO
const { TextEncoder, TextDecoder } = require('util');
const { ReadableStream, WritableStream, TransformStream } = require('stream/web');
const { BroadcastChannel } = require('worker_threads');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.ReadableStream = ReadableStream;
global.WritableStream = WritableStream;
global.TransformStream = TransformStream;
global.BroadcastChannel = BroadcastChannel;

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
require('@testing-library/jest-dom');

const { server } = require('./mocks/server');

// Configurar MSW para las pruebas
beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
