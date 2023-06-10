// 💣 globalErrorHandler ~  ZodError: [
//     {
//       "code": "invalid_type",
//       "expected": "string",
//       "received": "undefined",
//       "path": [
//         "body",
//         "role"
//       ],
//       "message": "🤩 role is required."
//     }
//   ]
//       at Object.get error [as error] (D:\personal\next lavel\university-management-auth-service\node_modules\zod\lib\types.js:43:31)
//       at ZodObject.parseAsync (D:\personal\next lavel\university-management-auth-service\node_modules\zod\lib\types.js:164:22)
//       at processTicksAndRejections (node:internal/process/task_queues:96:5) {
//     issues: [
//       {
//         code: 'invalid_type',
//         expected: 'string',
//         received: 'undefined',
//         path: [Array],
//         message: '🤩 role is required.'
//       }
//     ],
//     addIssue: [Function (anonymous)],
//     addIssues: [Function (anonymous)]
//   }

import { IGenericErrorMessage } from '../interfaces/error';
import { IGenericErrorResponse } from '../interfaces/IGenericErrorResponse';
import { ZodError, ZodIssue } from 'zod';

const handleZodError = (error: ZodError): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });

  const statusCode = 400;
  return {
    statusCode,
    message: 'validation Error',
    errorMessages: errors,
  };
};
export default handleZodError;
