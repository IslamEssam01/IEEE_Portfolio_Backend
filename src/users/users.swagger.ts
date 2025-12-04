import {
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
} from '../constants/swagger-messages';

const user_example = {
  id: 'd102dadc-0b17-4e83-812b-00103b606a1f',
  name: 'Ali Said',
  email: 'asaszizg1@gmail.com',
  phone: '+201001234567',
  avatar_url: 'https://example.com/avatars/AliSaid.jpg',
  bio: 'Computer Science student interested in AI and web development',
  faculty: 'Faculty of Engineering',
  university: 'Cairo University',
  academic_year: 3,
  major: 'Computer Engineering',
  role_id: '550e8400-e29b-41d4-a716-446655440000',
  created_at: '2025-12-03T10:30:00Z',
  updated_at: '2025-12-03T10:30:00Z',
};

export const create_user_swagger = {
  operation: {
    summary: 'Create a new user',
    description:
      'Create a new user account with email, password, and profile information.',
  },

  responses: {
    success: {
      description: 'User created successfully',
      schema: {
        example: {
          data: {
            ...user_example,
          },
          count: 1,
          message: SUCCESS_MESSAGES.USER_REGISTERED,
        },
      },
    },
    badRequest: {
      description: 'Invalid input or validation error',
      schema: {
        example: {
          message: `Password must include uppercase, lowercase, number, and special character`,
          error: 'Bad Request',
          statusCode: 400,
        },
      },
    },
    conflict: {
      description: 'Email already exists',
      schema: {
        example: {
          message: ERROR_MESSAGES.EMAIL_ALREADY_EXISTS,
          error: 'Conflict',
          statusCode: 409,
        },
      },
    },
    internalServerError: {
      description: 'Internal server error',
      schema: {
        example: {
          message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
          error: 'Internal Server Error',
          statusCode: 500,
        },
      },
    },
  },
};

export const get_all_users_swagger = {
  operation: {
    summary: 'Get all users',
    description: 'Retrieve a paginated list of all users in the system.',
  },

  responses: {
    success: {
      description: 'Users retrieved successfully',
      schema: {
        example: {
          data: [user_example],
          count: 1,
          message: 'Users retrieved successfully',
        },
      },
    },
    internalServerError: {
      description: 'Internal server error',
      schema: {
        example: {
          message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
          error: 'Internal Server Error',
          statusCode: 500,
        },
      },
    },
  },
};

export const get_user_by_id_swagger = {
  operation: {
    summary: 'Get user by ID',
    description: 'Retrieve a specific user by their unique ID.',
  },

  responses: {
    success: {
      description: 'User retrieved successfully',
      schema: {
        example: {
          data: {
            ...user_example,
          },
          count: 1,
          message: 'User retrieved successfully',
        },
      },
    },
    notFound: {
      description: 'User not found',
      schema: {
        example: {
          message: ERROR_MESSAGES.USER_NOT_FOUND,
          error: 'Not Found',
          statusCode: 404,
        },
      },
    },
    internalServerError: {
      description: 'Internal server error',
      schema: {
        example: {
          message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
          error: 'Internal Server Error',
          statusCode: 500,
        },
      },
    },
  },
};

export const update_user_swagger = {
  operation: {
    summary: 'Update user',
    description: 'Update user profile information and details.',
  },

  responses: {
    success: {
      description: 'User updated successfully',
      schema: {
        example: {
          data: {
            ...user_example,
            updated_at: '2025-12-03T15:45:00Z',
          },
          count: 1,
          message: 'User updated successfully',
        },
      },
    },
    badRequest: {
      description: 'Invalid input or validation error',
      schema: {
        example: {
          message: 'Invalid input data',
          error: 'Bad Request',
          statusCode: 400,
        },
      },
    },
    notFound: {
      description: 'User not found',
      schema: {
        example: {
          message: ERROR_MESSAGES.USER_NOT_FOUND,
          error: 'Not Found',
          statusCode: 404,
        },
      },
    },
    internalServerError: {
      description: 'Internal server error',
      schema: {
        example: {
          message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
          error: 'Internal Server Error',
          statusCode: 500,
        },
      },
    },
  },
};

export const delete_user_swagger = {
  operation: {
    summary: 'Delete user',
    description: 'Delete a user account and all associated data.',
  },

  responses: {
    success: {
      description: 'User deleted successfully',
      schema: {
        example: {
          data: {
            id: user_example.id,
          },
          count: 1,
          message: 'User deleted successfully',
        },
      },
    },
    notFound: {
      description: 'User not found',
      schema: {
        example: {
          message: ERROR_MESSAGES.USER_NOT_FOUND,
          error: 'Not Found',
          statusCode: 404,
        },
      },
    },
    internalServerError: {
      description: 'Internal server error',
      schema: {
        example: {
          message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
          error: 'Internal Server Error',
          statusCode: 500,
        },
      },
    },
  },
};
