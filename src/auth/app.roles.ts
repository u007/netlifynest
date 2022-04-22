import { RolesBuilder } from 'nest-access-control';
export enum AppRoles {
  ADMIN = 'ADMIN',
  USER_CREATE_ANY_VIDEO = 'USER_CREATE_ANY_VIDEO',
  ADMIN_UPDATE_OWN_VIDEO = 'ADMIN_UPDATE_OWN_VIDEO',
  MANAGE_USER_READ = 'MANAGE_USER_READ',

  MANAGE_ROLE_READ = 'MANAGE_ROLE_READ',
  MANAGE_ROLE_CREATE = 'MANAGE_ROLE_CREATE',
  MANAGE_ROLE_UPDATE = 'MANAGE_ROLE_UPDATE',
  MANAGE_ROLE_DELETE = 'MANAGE_ROLE_DELETE',
}

/**
 * grant admin full access,
 * grant user crud depending on roles
 * @param roles
 * @param name
 */
const grantCRUD = (roles: RolesBuilder, name: string) => {
  console.log('granting', AppRoles[`MANAGE_${name}_READ`]);
  roles
    .grant(`MANAGE_${name}_READ`)
    .readAny(name)
    .grant(`MANAGE_${name}_CREATE`)
    .createAny(name)
    .grant(`MANAGE_${name}_UPDATE`)
    .updateAny(name)
    .grant(`MANAGE_${name}_DELETE`)
    .deleteAny(name);
  roles
    .grant(AppRoles.ADMIN)
    .readAny(name)
    .createAny(name)
    .updateAny(name)
    .deleteAny(name);
};
export const roles: RolesBuilder = new RolesBuilder();
roles
  .grant(AppRoles.USER_CREATE_ANY_VIDEO) // define new or modify existing role. also takes an array.
  .createOwn('video') // equivalent to .createOwn('video', ['*'])
  .deleteOwn('video')
  .readAny('video')
  .grant(AppRoles.ADMIN_UPDATE_OWN_VIDEO) // switch to another role without breaking the chain
  .extend(AppRoles.USER_CREATE_ANY_VIDEO) // inherit role capabilities. also takes an array
  .updateAny('video', ['title']) // explicitly defined attributes
  .deleteAny('video')
  .grant(AppRoles.MANAGE_USER_READ) // define new or modify existing role. also takes an array.
  .readAny('user');

grantCRUD(roles, 'role');
