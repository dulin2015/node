import fetch from '@/api/config';

export const login = data => fetch('/auth/login', data)

export const download = data => fetch('/download', data, 'get')