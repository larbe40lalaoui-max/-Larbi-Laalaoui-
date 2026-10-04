package com.noorquran.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalLayoutDirection
import androidx.compose.ui.unit.LayoutDirection
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.noorquran.app.ui.components.AppBottomNavigation
import com.noorquran.app.ui.screens.*
import com.noorquran.app.ui.theme.NoorQuranTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            CompositionLocalProvider(LocalLayoutDirection provides LayoutDirection.Rtl) {
                NoorQuranTheme {
                    val navController = rememberNavController()
                    var currentRoute by remember { mutableStateOf("home") }

                    Scaffold(
                        modifier = Modifier.fillMaxSize(),
                        bottomBar = {
                            AppBottomNavigation(
                                currentRoute = currentRoute,
                                onNavigate = { route ->
                                    currentRoute = route
                                    navController.navigate(route) {
                                        popUpTo("home") { saveState = true }
                                        launchSingleTop = true
                                        restoreState = true
                                    }
                                }
                            )
                        }
                    ) { innerPadding ->
                        NavHost(
                            navController = navController,
                            startDestination = "home",
                            modifier = Modifier.padding(innerPadding)
                        ) {
                            composable("home") {
                                HomeScreen(
                                    onSurahClick = { surahNumber ->
                                        navController.navigate("surah/$surahNumber")
                                    },
                                    onOpenAzkar = {
                                        currentRoute = "azkar"
                                        navController.navigate("azkar")
                                    }
                                )
                            }
                            composable("surah/{surahNumber}") { backStackEntry ->
                                val surahNumber = backStackEntry.arguments?.getString("surahNumber")?.toIntOrNull() ?: 1
                                SurahReaderScreen(
                                    surahNumber = surahNumber,
                                    onBackClick = { navController.popBackStack() }
                                )
                            }
                            composable("bookmarks") {
                                BookmarksScreen(
                                    onAyahClick = { surahNum, _ ->
                                        navController.navigate("surah/$surahNum")
                                    }
                                )
                            }
                            composable("azkar") {
                                AzkarScreen()
                            }
                        }
                    }
                }
            }
        }
    }
}
