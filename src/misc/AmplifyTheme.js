/*
 * Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file.
 * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions
 * and limitations under the License.
 */


import bgImage from '../images/bg2.jpg';

export const Container = {};
export const FormContainer = {};
export const FormSection = {};
export const FormCard = {
  padding: '1.5rem',
  marginBottom: 0,
  minHeight: '100vh',
  boxShadow: '0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px 0 rgba(0,0,0,.14), 0 1px 18px 0 rgba(0,0,0,.12)',
};
export const FormField = {};

export const BackgroundImage = {
  backgroundSize: 'cover',
  backgroundImage: `url(${bgImage})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
};
export const LogoImage = {
  logo: 'url(https://seobooker-logo.s3-eu-west-1.amazonaws.com/Seobooker.png")',
  marginTop: '1rem',
  marginBottom: '1rem',
  maxWidth: '180px',
};

export const SectionHeader = {
  textAlign: 'center',
};
export const SectionBody = {};
export const SectionFooter = {};
export const SectionFooterPrimaryContent = {
  marginBottom: '1rem',
};
export const SectionFooterSecondaryContent = {};
export const Input = {};
export const Button = {};
export const PhotoPickerButton = {};
export const PhotoPlaceholder = {};
export const SignInButton = {};
export const SignInButtonIcon = {};
export const SignInButtonContent = {};
export const Strike = {};
export const StrikeContent = {};
export const ActionRow = {};
export const FormRow = {};
export const A = {};
export const Hint = {};
export const Radio = {};
export const Label = {};
export const InputLabel = {};
export const AmazonSignInButton = {};
export const FacebookSignInButton = {};
export const GoogleSignInButton = {};
export const OAuthSignInButton = {};
export const Toast = {};
export const NavBar = {};
export const NavRight = {};
export const Nav = {};
export const NavItem = {};
export const NavButton = {};

const AmplifyTheme = {
  container: Container,
  formContainer: FormContainer,
  formSection: FormSection,
  formCard: FormCard,
  formField: FormField,

  backgroundImage: BackgroundImage,
  logoImage: LogoImage,

  sectionHeader: SectionHeader,
  sectionBody: SectionBody,
  sectionFooter: SectionFooter,
  sectionFooterPrimaryContent: SectionFooterPrimaryContent,
  sectionFooterSecondaryContent: SectionFooterSecondaryContent,

  input: Input,
  button: Button,
  photoPickerButton: PhotoPickerButton,
  photoPlaceholder: PhotoPlaceholder,
  signInButton: SignInButton,
  signInButtonIcon: SignInButtonIcon,
  signInButtonContent: SignInButtonContent,
  amazonSignInButton: AmazonSignInButton,
  facebookSignInButton: FacebookSignInButton,
  googleSignInButton: GoogleSignInButton,
  oAuthSignInButton: OAuthSignInButton,

  formRow: FormRow,
  strike: Strike,
  strikeContent: StrikeContent,
  actionRow: ActionRow,
  a: A,

  hint: Hint,
  radio: Radio,
  label: Label,
  inputLabel: InputLabel,
  toast: Toast,

  navBar: NavBar,
  nav: Nav,
  navRight: NavRight,
  navItem: NavItem,
  navButton: NavButton,
};

export default AmplifyTheme;
