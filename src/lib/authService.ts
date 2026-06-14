import { supabase } from './supabaseClient';

// Vérifier si un utilisateur existe dans la base de données
export const checkUserExists = async (email: string) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('id, email, created_at')
      .eq('email', email)
      .single();

    if (error && error.code === 'PGRST116') {
      // Utilisateur n'existe pas
      return {
        exists: false,
        isNewUser: true,
        error: null
      };
    }

    if (error) throw error;

    return {
      exists: true,
      isNewUser: false,
      user: data,
      error: null
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Erreur lors de la vérification'
    };
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Récupérer les données utilisateur desde PostgreSQL
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (userError) throw userError;

    return {
      user: data.user,
      userData: userData,
      session: data.session,
      success: true,
      isNewUser: false
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Erreur de connexion'
    };
  }
};

export const signupUser = async (
  email: string,
  password: string,
  companyName: string,
  fullName: string,
  phoneNumber: string,
  plan: string,
  numberOfEmployees: string
) => {
  try {
    // Vérifier d'abord si l'utilisateur existe
    const existsCheck = await checkUserExists(email);
    if (existsCheck.exists) {
      return {
        success: false,
        error: 'Un compte avec cet email existe déjà. Veuillez vous connecter.',
        isNewUser: false
      };
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    // Créer l'enregistrement utilisateur dans PostgreSQL
    const { error: insertError } = await supabase
      .from('users')
      .insert([
        {
          id: data.user?.id,
          email: email,
          company_name: companyName,
          full_name: fullName,
          phone_number: phoneNumber,
          plan: plan,
          number_of_employees: numberOfEmployees,
          role: 'client',
          created_at: new Date(),
          is_new_user: true,
        }
      ]);

    if (insertError) throw insertError;

    return {
      user: data.user,
      success: true,
      isNewUser: true
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Erreur d\'inscription',
      isNewUser: false
    };
  }
};

export const logoutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  } catch (error) {
    return null;
  }
};

export const resetPassword = async (email: string) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};
