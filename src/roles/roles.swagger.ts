import { ERROR_MESSAGES } from '../constants/swagger-messages';

const role_example = {
  id: '550e8400-e29b-41d4-a716-446655440000',
  name: 'Admin',
  description: 'Administrator with full system access',
  created_at: '2025-12-03T10:30:00Z',
  updated_at: '2025-12-03T10:30:00Z',
};

export const create_role_swagger = {
  operation: {
    summary: 'Create a new role',
    description:
      'Create a new role with specific permissions and access levels.',
  },

  responses: {
    success: {
      description: 'Role created successfully',
      schema: {
        example: {
          data: {
            ...role_example,
          },
          count: 1,
          message: 'Role created successfully',
        },
      },
    },
    badRequest: {
      description: 'Invalid input or validation error',
      schema: {
        example: {
          message: 'Name is required and must be at least 2 characters',
          error: 'Bad Request',
          statusCode: 400,
        },
      },
    },
    conflict: {
      description: 'Role name already exists',
      schema: {
        example: {
          message: 'Role name already exists',
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

export const get_all_roles_swagger = {
  operation: {
    summary: 'Get all roles',
    description: 'Retrieve a paginated list of all roles in the system.',
  },

  responses: {
    success: {
      description: 'Roles retrieved successfully',
      schema: {
        example: {
          data: [role_example],
          count: 1,
          message: 'Roles retrieved successfully',
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

export const get_role_by_id_swagger = {
  operation: {
    summary: 'Get role by ID',
    description: 'Retrieve a specific role by its unique ID.',
  },

  responses: {
    success: {
      description: 'Role retrieved successfully',
      schema: {
        example: {
          data: {
            ...role_example,
          },
          count: 1,
          message: 'Role retrieved successfully',
        },
      },
    },
    notFound: {
      description: 'Role not found',
      schema: {
        example: {
          message: 'Role not found',
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

export const get_role_by_name_swagger = {
  operation: {
    summary: 'Get role by name',
    description: 'Retrieve a specific role by its name.',
  },

  responses: {
    success: {
      description: 'Role retrieved successfully',
      schema: {
        example: {
          data: {
            ...role_example,
          },
          count: 1,
          message: 'Role retrieved successfully',
        },
      },
    },
    notFound: {
      description: 'Role not found',
      schema: {
        example: {
          message: 'Role not found',
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

export const update_role_swagger = {
  operation: {
    summary: 'Update role',
    description: 'Update role information and permissions.',
  },

  responses: {
    success: {
      description: 'Role updated successfully',
      schema: {
        example: {
          data: {
            ...role_example,
            updated_at: '2025-12-03T15:45:00Z',
          },
          count: 1,
          message: 'Role updated successfully',
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
      description: 'Role not found',
      schema: {
        example: {
          message: 'Role not found',
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

export const delete_role_swagger = {
  operation: {
    summary: 'Delete role',
    description: 'Delete a role and remove it from the system.',
  },

  responses: {
    success: {
      description: 'Role deleted successfully',
      schema: {
        example: {
          data: {},
          count: 1,
          message: 'Role deleted successfully',
        },
      },
    },
    notFound: {
      description: 'Role not found',
      schema: {
        example: {
          message: 'Role not found',
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
